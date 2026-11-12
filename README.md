# DocRadar

A daily-updated tracker of jobs, walk-ins and exams for a new MBBS doctor based in Meerut, UP.

- `index.html`: the website (static, no build step)
- `data/jobs.json`: the listings, rewritten by the daily update
- `data/sources.json`: key websites to check
- `UPDATE_INSTRUCTIONS.md`: the instructions the daily Claude routine follows
- `scripts/maintain.mjs`: validates, removes duplicates and prunes old closed listings (`node scripts/maintain.mjs`)

Local preview: `python3 -m http.server 8765`, then open http://localhost:8765
Deploy: import this repo into Vercel (framework preset "Other", no build command). Every push redeploys the site.
