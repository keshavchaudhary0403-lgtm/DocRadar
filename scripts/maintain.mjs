// Validates data/jobs.json, removes duplicates, drops listings closed > 60 days ago,
// sorts by deadline and stamps the "updated" date. Run: node scripts/maintain.mjs
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../data/jobs.json", import.meta.url);
const CATEGORIES = ["jr", "mo", "defence", "exam", "private", "other"];
const REGIONS = ["meerut", "up", "delhi-ncr", "all-india"];
const ELIGIBILITY = ["intern-ok", "after-internship"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const today = new Date().toISOString().slice(0, 10);
const cutoff = new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10);
const data = JSON.parse(readFileSync(FILE, "utf8"));
const errors = [];
const seen = new Map();

for (const j of data.jobs) {
  const where = `job "${j.id ?? j.title}"`;
  for (const k of ["id", "title", "org", "category", "location", "region", "eligibility", "addedOn"])
    if (!j[k]) errors.push(`${where}: missing ${k}`);
  if (j.category && !CATEGORIES.includes(j.category)) errors.push(`${where}: bad category ${j.category}`);
  if (j.region && !REGIONS.includes(j.region)) errors.push(`${where}: bad region ${j.region}`);
  if (j.eligibility && !ELIGIBILITY.includes(j.eligibility)) errors.push(`${where}: bad eligibility ${j.eligibility}`);
  for (const k of ["lastDate", "eventDate", "addedOn"])
    if (j[k] != null && !DATE.test(j[k])) errors.push(`${where}: ${k} must be YYYY-MM-DD`);
  if (!j.officialUrl && !j.sourceUrl) errors.push(`${where}: needs officialUrl or sourceUrl`);
  const r = j.requirements;
  if (r) {
    const known = ["internshipBy", "registration", "councils", "maxAge", "ageOn", "ageRelax", "neetPg", "maxAttempts", "gender"];
    for (const k of Object.keys(r)) if (!known.includes(k)) errors.push(`${where}: unknown requirement ${k}`);
    if (r.internshipBy && !["eventDate", "lastDate"].includes(r.internshipBy) && !DATE.test(r.internshipBy)) errors.push(`${where}: internshipBy must be a date, "eventDate" or "lastDate"`);
    if (r.registration && !["permanent", "any"].includes(r.registration)) errors.push(`${where}: registration must be "permanent" or "any"`);
    if (r.ageOn && !DATE.test(r.ageOn)) errors.push(`${where}: ageOn must be YYYY-MM-DD`);
    if (r.maxAge != null && typeof r.maxAge !== "number") errors.push(`${where}: maxAge must be a number`);
    if (r.neetPg && !Array.isArray(r.neetPg)) errors.push(`${where}: neetPg must be an array of years`);
    if (r.gender && !["male", "female"].includes(r.gender)) errors.push(`${where}: gender must be "male" or "female"`);
  }
  if (seen.has(j.id)) { // keep the earliest addedOn, newest details
    const prev = seen.get(j.id);
    seen.set(j.id, { ...prev, ...j, addedOn: prev.addedOn < j.addedOn ? prev.addedOn : j.addedOn });
  } else seen.set(j.id, j);
}

if (errors.length) {
  console.error("❌ jobs.json has problems:\n  " + errors.join("\n  "));
  process.exit(1);
}

const before = data.jobs.length;
data.jobs = [...seen.values()]
  .filter(j => j.lastDate == null || j.lastDate >= cutoff)
  .sort((a, b) => (a.lastDate ?? "9999") .localeCompare(b.lastDate ?? "9999"));
data.updated = today;
writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n");

const open = data.jobs.filter(j => j.lastDate == null || j.lastDate >= today).length;
console.log(`✅ ${data.jobs.length} listings (${open} open), removed ${before - data.jobs.length}. Updated ${today}.`);
