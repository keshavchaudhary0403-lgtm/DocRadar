# DocRadar

A daily-updated tracker of jobs, walk-ins and exams for MBBS doctors across India.

- `index.html`: the website (static, no build step)
- `data/jobs.json`: the listings, rewritten by the daily update
- `data/sources.json`: key websites to check
- `UPDATE_INSTRUCTIONS.md`: the full playbook the daily updater follows (sources, 32-query web sweep, data format, verification)
- `DAILY_PROMPT.md`: copy-paste prompt plus setup for running the daily update from another Claude Code login
- `data/update-log.md`: one entry per daily run
- `scripts/maintain.mjs`: validates, removes duplicates and prunes old closed listings (`node scripts/maintain.mjs`)

Local preview: `python3 -m http.server 8765`, then open http://localhost:8765
Deploy: import this repo into Vercel (framework preset "Other", no build command). Every push redeploys the site.
