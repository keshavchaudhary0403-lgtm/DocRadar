# Daily DocRadar update

You are updating DocRadar, a job tracker for a doctor in Meerut, UP. He finished MBBS at
Subharti Medical College and is doing his compulsory internship (CRMI) there.
Find **new, still-open** opportunities and add them to `data/jobs.json`.

## Who it's for
- **Home base:** Meerut. Priority order: Meerut → West UP / rest of UP → Delhi NCR → rest of India.
- **Status:** intern. Most JR/MO posts need a completed internship and permanent registration.
  Include them anyway (he plans ahead), but set `eligibility` correctly.
- **Wanted:** Junior Resident (non-academic / non-PG), Medical Officer (govt, NHM, ESIC, Railways,
  CAPF, UPSC CMS), Army/Navy/AF SSC Medical Officer, PG entrance exams (NEET-PG, INI-CET, NExT),
  private hospital RMO / duty doctor jobs in Meerut, Ghaziabad, Noida and Delhi, and fellowships
  or research posts open to MBBS graduates.
- **Skip:** posts needing MD/MS/DNB (Senior Resident, faculty, specialist), BDS/AYUSH/nursing-only
  posts, anything already closed, and private jobs needing 3+ years' experience.

## Steps
1. Read `data/jobs.json` (current listings) and `data/sources.json` (key websites).
2. Search the web. Run at least these searches, adding the current month and year to each:
   - `junior resident non academic walk-in MBBS <month year>`
   - `junior resident non-PG MBBS Delhi <month year>`
   - `medical officer MBBS recruitment Uttar Pradesh <month year>`
   - `NHM UP medical officer vacancy <month year>`
   - `ESIC junior resident walk-in <month year>`
   - `Meerut hospital MBBS doctor vacancy` and `RMO MBBS job Ghaziabad Noida`
   - `AFMS SSC medical officer`, `NEET PG 2027 notification`, `INI-CET <next session>`, `UPSC CMS 2027`
   Also check the priority-1 sites in `sources.json` directly where you can (WebFetch). Always open
   https://www.sarkariresult.com and https://sarkariresult.com.cm and scan their latest-jobs lists for
   medical posts (Medical Officer, Junior Resident, AFMS, NHM, ESIC, CMS, NEET-PG). These are
   aggregators, so use them to find listings, then confirm on the official notice as described below.
3. For every candidate listing:
   - Keep it only if the **last date is today or later** or the date isn't announced yet (exams/big notifications).
   - Try to open the **official notice** (institute or govt site). If you confirm the details there,
     set `"verified": true` and put that link in `officialUrl`. Otherwise keep `verified: false`,
     link the aggregator in `sourceUrl` and the institute's homepage in `officialUrl`.
   - Skip anything already in the file (same institute + post + date). If an existing entry has new
     info (corrected date, official PDF), update that entry in place without changing `id` or `addedOn`.
4. Add new entries in this exact format:
   ```json
   {
     "id": "short-kebab-slug-with-date",
     "title": "Post name – N posts, walk-in",
     "org": "Institute / hospital",
     "category": "jr | mo | defence | exam | private | other",
     "location": "City, State",
     "region": "meerut | up | delhi-ncr | all-india",
     "posts": 12,
     "salary": "₹56,100 + NPA",
     "mode": "Walk-in | Apply online | Apply offline",
     "lastDate": "YYYY-MM-DD or null",
     "eventDate": "YYYY-MM-DD or null (interview / exam date)",
     "eligibility": "intern-ok | after-internship",
     "eligibilityNote": "One or two plain sentences: key requirements (internship cut-off, registration, age), reporting time.",
     "officialUrl": "https://…",
     "sourceUrl": "https://…",
     "addedOn": "today YYYY-MM-DD",
     "verified": false
   }
   ```
   `region` rules: anything in Meerut district → `meerut`; elsewhere in UP (except Noida/Ghaziabad) → `up`;
   Delhi, Noida, Ghaziabad, Gurugram, Faridabad → `delhi-ncr`; everything else → `all-india`.
5. Run `node scripts/maintain.mjs`. Fix any errors it reports and run it again until it passes.
   It removes duplicates and old closed listings, and sets the `updated` date.
6. Commit and push: `git add data && git commit -m "Daily update <date>: +N new" && git push`.
   If there was nothing new, still run step 5 and commit (it refreshes the "updated" date).

## Accuracy rules
- Never invent a listing, date, salary or link. If a detail isn't clear, leave it out or `null`.
- When sources disagree on a date, use the official notice. If there's no official notice, use the
  earlier date and say so in `eligibilityNote`.
- Better to add 2 real listings than 10 doubtful ones.
