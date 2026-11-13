# DocRadar

Static job and exam tracker for MBBS doctors across India: `index.html` reads `data/jobs.json`
and `data/sources.json`. Deployed on Vercel from `main`; every push redeploys.

## Daily updates
- A cloud scheduled task, **"DocRadar daily update"**, runs every day at **6:40 AM IST**. It follows
  `UPDATE_INSTRUCTIONS.md` (prompt in `DAILY_PROMPT.md`), edits `data/jobs.json`,
  `data/sources.json` and `data/update-log.md`, and pushes straight to `main`.
- **Always run `git pull --rebase origin main` before editing anything.** The task pushes data
  changes every morning, so a stale checkout will conflict.
- **Don't hand-edit `data/jobs.json`** except to fix something specific. Keep existing `id` and
  `addedOn` values unchanged, and never resolve a `jobs.json` conflict by dropping either side's
  listings.
- **Keep the daily task compatible:** if you change the data format, field names or
  `scripts/maintain.mjs`, update `UPDATE_INSTRUCTIONS.md` (and `DAILY_PROMPT.md` if needed) in the
  same commit.
- `node scripts/scan-sources.mjs` fetches every source and writes `scan/digest.md` (git-ignored)
  for the daily task to review.
- `node scripts/maintain.mjs` validates the data and must end with ✅. It also re-stamps
  `updatedAt`, so don't commit that change on its own.
