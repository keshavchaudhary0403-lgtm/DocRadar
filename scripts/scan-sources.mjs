#!/usr/bin/env node
// Fetches EVERY source in data/sources.json in parallel and writes a digest of the
// recruitment-related links and text on each page, so the daily update can review
// all sources without one WebFetch/WebSearch per site.
//
//   node scripts/scan-sources.mjs                # all sources
//   node scripts/scan-sources.mjs --limit 50     # first 50 (testing)
//   node scripts/scan-sources.mjs --only-failed  # catch-up: only the sources listed in
//                                                # data/scan-failed.json from today's full scan
//   node scripts/scan-sources.mjs --only-failed --batch 2/4
//        --batch k/n scans only the k-th of n equal parts and writes scan/digest-k.md and
//        scan/catchup-k.json (for shells that cut off long commands; run 1/n … n/n, then
//        combine the catchup-k.json parts into data/scan-failed.json yourself).
//   node scripts/scan-sources.mjs --only-failed --input-dir scan
//        same, but reads sources.json and scan-failed.json from scan/ (copied there from a
//        fresh clone) instead of data/, and writes the catch-up result to scan/catchup.json,
//        so the computer running it needs no git.
//
// Output (git-ignored):
//   scan/digest.md   one section per source: [index] name · state · group · status, then links
//                    ★ = link text/URL mentions MBBS-level medical posts
//   scan/scan.json   the same data as JSON, plus a summary
//   data/scan-failed.json  (full scan) the sources that failed, for the catch-up run;
//                          (--only-failed) adds a "catchup" block with what still fails.
// Stdout ends with "Sources: scanned N of TOTAL · ok X · failed Y".
//
// Sites with certificate errors are reported as failed (status shows the TLS error code);
// the daily task covers them with WebFetch or a site: search.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const LIMIT = +opt('--limit', 0);
const ONLY_FAILED = args.includes('--only-failed');
const INPUT_DIR = opt('--input-dir', '');
const loadJSON = path => JSON.parse(readFileSync(new URL('../' + (INPUT_DIR ? INPUT_DIR.replace(/\/$/, '') + '/' + path.split('/').pop() : path), import.meta.url), 'utf8'));
const today = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10); // IST date
const FAILED_FILE = new URL('../data/scan-failed.json', import.meta.url);
const CONC = +opt('--concurrency', 32);
const TIMEOUT = +opt('--timeout', 25000);
const MAX_BYTES = 3_000_000;
const MAX_LINKS = 15;

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const HIRE = /recruit|walk[\s-]*in|vacanc|advertis|advt|notification|career|\bjobs?\b|interview|engagement|empanel|contractual|applications? (are )?invited|medical officer|junior resident|senior resident|\bj\.?r\.?s?\b|gdmo|resident|doctors?|mbbs|bharti|bharati|bhartee|niyukti|requirement|appointment|notice|latest|what'?s new|announcement|news/i;
const MED = /medical officer|\bm\.?o\.?s?\b|junior resident|\bjrs?\b|senior resident|\bsrs?\b|gdmo|\bmbbs\b|doctors?\b|physician|casualty|house (staff|surgeon)|\brmo\b|\bimo\b|\bemo\b|walk[\s-]*in|project (scientist|research)|scientist[\s-]*['"‘’]?b|research (officer|associate)|resident medical/i;
// Unstarred links are kept only when they clearly point at hiring.
const STRONG = /recruit|walk[\s-]*in|vacanc|advertis|advt|interview|engagement|empanel|contractual|applications? (are )?invited|\bcareers?\b|\bjobs?\b|bharti|bharati|bhartee|niyukti/i;
// Results, selection lists and admin documents aren't new openings.
const NOISE = /result|shortlist|short-list|selected|selection list|admit card|answer key|question paper|appointment (letter|order)|joining|joined|merit list|final list|provisional list|marks|syllabus|exam schedule|\+ ?(text|href)|admission|counsel+ing|seat matrix|fee structure|newsletter|tender|rank ?list|time ?table|workshop|seminar|conference|\bcme\b|webinar|convocation/i;
const Y = new Date().getFullYear();
// A link that mentions only years before this one is old (e.g. "Advt 2024").
const isOld = t => { const ys = (t.match(/\b(?:19|20)\d{2}\b/g) || []).map(Number); return ys.length > 0 && Math.max(...ys) < Y; };
const SKIP = /tender|quotation|e-?auction|\brti\b|javascript:|mailto:|tel:|facebook|twitter|instagram|youtube|linkedin|whatsapp|#$/i;
const NAVLINK = /recruit|career|vacanc|\bjobs?\b|advertis|walk[\s-]*in|notice|notification|announcement|what'?s new|latest/i;
const TEXTHIT = /(medical officer|junior resident|walk[\s-]*in|gdmo|casualty medical|resident medical officer)/ig;
const SNIPHIRE = /recruit|vacanc|walk[\s-]*in|interview|advertis|advt|applications? (are )?invited|engagement|contract|posts?\b|last date/i;

const ent = s => s.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const clean = s => ent(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

async function get(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'accept-language': 'en-IN,en;q=0.9,hi;q=0.8' } });
    const type = r.headers.get('content-type') || '';
    if (!r.ok) return { ok: false, status: r.status, finalUrl: r.url };
    if (/pdf/i.test(type)) return { ok: true, status: r.status, finalUrl: r.url, pdf: true, html: '' };
    const reader = r.body.getReader(); let size = 0; const chunks = [];
    for (;;) { const { done, value } = await reader.read(); if (done) break; size += value.length; chunks.push(value); if (size > MAX_BYTES) { ctl.abort(); break; } }
    return { ok: true, status: r.status, finalUrl: r.url, html: Buffer.concat(chunks).toString('utf8') };
  } catch (e) {
    return { ok: false, status: e.name === 'AbortError' ? 'timeout' : (e.cause?.code || e.message || 'error').toString().slice(0, 60) };
  } finally { clearTimeout(t); }
}

function extract(html, base) {
  const links = []; const seen = new Set();
  // Bounded parse: find each "<a", read its tag, then look for "</a>" within 1500 chars.
  // (A single regex over the whole page backtracks badly on large pages.)
  const lower = html.toLowerCase();
  let pos = 0;
  while ((pos = lower.indexOf('<a', pos)) !== -1) {
    const c = lower[pos + 2];
    if (c !== ' ' && c !== '\n' && c !== '\t' && c !== '\r') { pos += 2; continue; }
    const tagEnd = html.indexOf('>', pos);
    if (tagEnd === -1 || tagEnd - pos > 3000) { pos += 2; continue; }
    const tag = html.slice(pos, tagEnd + 1);
    const close = lower.indexOf('</a', tagEnd);
    const inner = close !== -1 && close - tagEnd < 1500 ? html.slice(tagEnd + 1, close) : '';
    pos = tagEnd + 1;
    const hm = /href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(tag);
    if (!hm) continue;
    const href = (hm[1] ?? hm[2] ?? hm[3] ?? '').trim();
    let text = clean(inner);
    if (!text) { const t = /title\s*=\s*["']([^"']+)/i.exec(tag); text = t ? clean(t[1]) : ''; }
    if (!href || SKIP.test(href) || SKIP.test(text)) continue;
    let abs; try { abs = new URL(ent(href), base).href; } catch { continue; }
    if (seen.has(abs) || (abs.includes("#") && abs.split("#")[0] === String(base).split("#")[0])) continue;
    let u = abs; try { u = decodeURIComponent(abs); } catch {}
    const hay = text + ' ' + u;
    if (!HIRE.test(hay) || NOISE.test(text)) continue;
    if (isOld(hay)) continue;
    const med = MED.test(hay);
    seen.add(abs);
    links.push({ text: text.slice(0, 200) || '(no text)', url: abs, med, strong: med || STRONG.test(hay) });
  }
  links.sort((a, b) => b.med - a.med);
  const body = clean(html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' '));
  const snippets = []; let h;
  TEXTHIT.lastIndex = 0;
  while ((h = TEXTHIT.exec(body)) && snippets.length < 3) {
    const s = body.slice(Math.max(0, h.index - 100), h.index + 140);
    if (SNIPHIRE.test(s) && !NOISE.test(s) && !isOld(s) && !snippets.some(x => x.slice(0, 40) === s.slice(0, 40))) snippets.push(s);
    TEXTHIT.lastIndex = h.index + 140;
  }
  return { links, snippets };
}

async function scan(src, i) {
  const res = { i: src._i ?? i + 1, name: src.name, url: src.url, state: src.state, group: src.group, ok: false, status: null, links: [], snippets: [], followed: [] };
  let r = await get(src.url);
  if (!r.ok && /^https:/.test(src.url)) { const r2 = await get(src.url.replace(/^https:/, 'http:')); if (r2.ok) r = r2; }
  res.status = r.status; res.finalUrl = r.finalUrl;
  if (!r.ok) return res;
  res.ok = true;
  if (r.pdf) { res.links.push({ text: '(source URL is a PDF)', url: r.finalUrl, med: true }); return res; }
  const { links, snippets } = extract(r.html, r.finalUrl || src.url);
  res.links = links; res.snippets = snippets;
  // Homepage with few medical hits: follow up to 2 recruitment/notice pages on the same site.
  if (links.filter(l => l.med).length < 3) {
    let host; try { host = new URL(r.finalUrl || src.url).hostname.replace(/^www\./, ''); } catch {}
    const nav = links.filter(l => NAVLINK.test(l.text + ' ' + l.url) && !/\.pdf($|\?)/i.test(l.url) && (() => { try { return new URL(l.url).hostname.replace(/^www\./, '') === host; } catch { return false; } })()).slice(0, 2);
    for (const n of nav) {
      const r2 = await get(n.url);
      if (!r2.ok || r2.pdf) continue;
      const e2 = extract(r2.html, r2.finalUrl || n.url);
      res.followed.push(n.url);
      const have = new Set(res.links.map(l => l.url));
      for (const l of e2.links) if (!have.has(l.url)) res.links.push(l);
      res.snippets.push(...e2.snippets.slice(0, 2));
    }
    res.links.sort((a, b) => b.med - a.med);
  }
  res.links = [...res.links.filter(l => l.med), ...res.links.filter(l => l.strong && !l.med).slice(0, 6)].slice(0, MAX_LINKS);
  return res;
}

const data = loadJSON('data/sources.json');
let list = data.sources.map((s, k) => ({ ...s, _i: k + 1 }));
let failedFile = null;
if (ONLY_FAILED) {
  try { failedFile = loadJSON('data/scan-failed.json'); } catch {}
  if (!failedFile || failedFile.date !== today()) {
    console.error(`  data/scan-failed.json is missing or not from today (${failedFile?.date ?? 'none'}): today's cloud scan didn't run, so scanning ALL sources.`);
  } else {
    const want = new Set(failedFile.failed.map(f => f.url));
    list = list.filter(s => want.has(s.url));
  }
}
if (LIMIT) list = list.slice(0, LIMIT);
const BATCH = opt('--batch', '');
const SUFFIX = BATCH ? '-' + BATCH.split('/')[0] : '';
if (BATCH) {
  const [k, n] = BATCH.split('/').map(Number);
  const size = Math.ceil(list.length / n);
  list = list.slice((k - 1) * size, k * size);
}
const out = new Array(list.length); let next = 0, done = 0;
const t0 = Date.now();
await Promise.all(Array.from({ length: Math.min(CONC, list.length) }, async () => {
  while (next < list.length) {
    const i = next++;
    if (process.env.DEBUG) console.error("start", i, list[i].url);
    out[i] = await scan(list[i], i);
    if (process.env.DEBUG) console.error("end", i, out[i].status, out[i].links.length);
    if (++done % 100 === 0) console.error(`  ${done}/${list.length} done (${Math.round((Date.now() - t0) / 1000)}s)`);
  }
}));

// Second pass: retry timeouts and resets slowly (they are often transient).
const retry = out.map((r, i) => (!r.ok && /TIMEOUT|timeout|ECONNRESET|fetch|5\d\d/.test(String(r.status)) ? i : -1)).filter(i => i >= 0);
if (retry.length) {
  console.error(`  retrying ${retry.length} timed-out sources…`);
  let k = 0;
  await Promise.all(Array.from({ length: Math.min(8, retry.length) }, async () => {
    while (k < retry.length) { const i = retry[k++]; const r = await scan(list[i], i); if (r.ok) out[i] = r; }
  }));
}
const ok = out.filter(r => r.ok), failed = out.filter(r => !r.ok);
const summary = { mode: ONLY_FAILED ? 'only-failed' : 'full', retried: retry.length, date: today(), total: out.length, scanned: out.length, ok: ok.length, failed: failed.length, seconds: Math.round((Date.now() - t0) / 1000) };
mkdirSync(new URL('../scan/', import.meta.url), { recursive: true });
writeFileSync(new URL(`../scan/scan${SUFFIX}.json`, import.meta.url), JSON.stringify({ summary, results: out }, null, 1));

let md = `# Source scan ${summary.date}${ONLY_FAILED ? ' (catch-up: sources that failed in the morning scan)' : ''}\nscanned ${summary.scanned} of ${summary.total} · ok ${summary.ok} · failed ${summary.failed}\n★ = mentions MBBS-level medical posts. Review every section; open promising notices to verify.\n`;
for (const r of out) {
  md += `\n### [${r.i}] ${r.name} · ${r.state} · ${r.group} · ${r.ok ? 'ok' : 'FAILED ' + r.status}\n${r.url}${r.finalUrl && r.finalUrl !== r.url ? ' → ' + r.finalUrl : ''}\n`;
  if (r.followed.length) md += `followed: ${r.followed.join(' , ')}\n`;
  for (const l of r.links.filter(l => l.strong)) md += `- ${l.med ? '★ ' : ''}${l.text} → ${l.url}\n`;
  for (const s of r.snippets) md += `> …${s}…\n`;
  if (r.ok && !r.links.some(l => l.strong) && !r.snippets.length) md += `(no recruitment links found on the page)\n`;
}
writeFileSync(new URL(`../scan/digest${SUFFIX}.md`, import.meta.url), md);

const brief = r => ({ i: r.i, name: r.name, url: r.url, state: r.state, group: r.group, status: String(r.status) });
if (INPUT_DIR || BATCH) {
  // No git on this computer, or one part of several: hand the result over via scan/.
  writeFileSync(new URL(`../scan/catchup${SUFFIX}.json`, import.meta.url), JSON.stringify({ morningDate: failedFile?.date ?? null, catchup: { date: summary.date, scanned: summary.scanned, ok: summary.ok, stillFailed: failed.map(brief) } }, null, 1) + '\n');
} else if (!LIMIT && !ONLY_FAILED && !BATCH) {
  writeFileSync(FAILED_FILE, JSON.stringify({ date: summary.date, total: summary.total, ok: summary.ok, failed: failed.map(brief) }, null, 1) + '\n');
} else if (ONLY_FAILED && failedFile && failedFile.date === summary.date) {
  failedFile.catchup = { date: summary.date, scanned: summary.scanned, ok: summary.ok, stillFailed: failed.map(brief) };
  writeFileSync(FAILED_FILE, JSON.stringify(failedFile, null, 1) + '\n');
}
console.log(`Failed (${failed.length}):`);
for (const r of failed) console.log(`  [${r.i}] ${r.name} · ${r.url} · ${r.status}`);
console.log(`\nDigest: scan/digest${SUFFIX}.md (${md.split('\n').length} lines) · JSON: scan/scan${SUFFIX}.json`);
console.log(`Sources: scanned ${summary.scanned} of ${summary.total} · ok ${summary.ok} · failed ${summary.failed} · ${summary.seconds}s`);
// Open keep-alive sockets can keep Node running after the scan; exit explicitly.
process.exit(0);
