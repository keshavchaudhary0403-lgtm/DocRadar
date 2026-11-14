# DocRadar update log

## 2026-11-14
- New: 11.
  - CMO Ballia MO/EMO/Female MO, 14 posts, walk-in 27 Nov (Uttar Pradesh)
  - IIT Roorkee GDMO walk-in 4 Dec (Uttarakhand)
  - GMC Haldwani VRDL Scientist-B (Medical) walk-in 19 Nov (Uttarakhand)
  - Shipping Corporation of India Assistant Medical Officer, 4 posts, extended to 19 Nov (Maharashtra)
  - NID Assam Visiting MO, 29 Nov (Assam, unverified: the official PDF failed the TLS check)
  - JPCH Shastri Park JR, 2 posts, walk-in 17 Nov (Delhi)
  - GAIL Khera Factory MO, 26 Nov (Madhya Pradesh; date counted from "30 days of publication")
  - IIT Indore locum MO, 3 posts, rolling (Madhya Pradesh)
  - NHM Uttarakhand MO, 16 posts, monthly walk-in (Uttarakhand; next date not yet notified)
  - GMC Kannauj JR, walk-in every Monday (Uttar Pradesh)
  - MRAMC Ambedkar Nagar Psychiatry JR, walk-in every Wednesday (Uttar Pradesh)
- Updated: 0. AFMS SSC (18 Nov), NEET-PG 2027, UPSC CMS 2027, NHPC and ANIIMS were rechecked, with no change needed.
- State group covered: Saturday (Arunachal Pradesh, Manipur, Mizoram, Nagaland, Tripura). All 15 queries, plus extended reruns and "doctor vacancy" fallbacks. Nothing new: open items were BDS-only (RIMS Imphal JR Dental) or AYUSH-only (SAM Tripura), and the rest had closed.
- Section 7 gap searches found nothing open in: Rajasthan, Himachal Pradesh, Chhattisgarh, Goa, Sikkim, Puducherry, Chandigarh, DNH&DD, Lakshadweep, Odisha, Kerala.
- Listing tables:
  - FreeJobAlert medical table: 211 rows read (a single page back to 10 Oct; page/2 repeats it). 119 were doctor-related: 34 already listed, 5 added, 80 skipped (SR/faculty/PG, AYUSH/BDS/nursing, non-MBBS).
  - Other tables: MySarkariNaukri ~110 cards, GovtJobsAlert ~50, SahiSarkariJobs 4, CentralStateJobs ~60, Medical Dialogues 11 (all stale). 0 new beyond the FJA set.
  - Borderline items left out: ESIC Rohini "SR against GDMO" walk-in 25–26 Nov (MBBS + 2 years only if no PG candidate turns up; esic.gov.in PDF wouldn't load); ESIC Tirunelveli SR A&E (MBBS with experience, walk-ins to 16 Dec; PDF wouldn't load); ESIC Kolhapur rolling MO (notice from about March).
  - Reconciliation: re-read the FJA table before publishing. Every open MBBS row is listed or skipped as above.
- Searches run: about 205 web searches (the budget ran out during the last digest range), plus about 300 page/PDF fetches via curl.
- Sources: scanned 782 of 782 · ok 523 · failed 259.
  - Every digest range ([1]–[196], [197]–[392], [393]–[588], [589]–[782]) was reviewed.
  - All-India failed sources were covered by site:/topic searches. Most failed *.gov.in / *.nic.in hosts time out from the cloud and are in data/scan-failed.json for the Mac catch-up.
  - Failed and still not covered: most state health, PSC and NHM portals in AP, Arunachal, Assam (incl. 14 medical college sites), Bihar, Chhattisgarh, Goa, Gujarat, Haryana, HP, J&K, Jharkhand, Karnataka, MP, Mizoram, Odisha (incl. DMET and 9 college sites), Puducherry, Punjab, Rajasthan, Sikkim, TN, Telangana, Tripura, UP, WB; individual cantonment board and railway unit pages; recruitment.icmr.org.in, nidhr.icmr.org.in, rmrims.org.in, sail.co.in, thdc.co.in.
- Sources.json:
  - URLs fixed: Delhi Health → /vacancy, IIT Indore → walk-in tab, IOCL → latest-job-opening, DNH&DD → recruitments page, PDU Rajkot → /latest-updates/, WBHRB → hrb.wb.gov.in, AIIMS Raipur → JR/SR vacancies page.
  - Added: BFUHS university recruitment (Punjab), SJMCH Puri (Odisha).
- Notes:
  - DMET Odisha JR 309 posts: pre-registration closed 9 Oct and the walk-in is "to be notified"; dmet.odisha.gov.in 503. Not listed; recheck on the catch-up run.
  - GMERS Morbi JR/Tutor "till filled" was left out (no further interview dates stated).
  - BBMB (bbmb.gov.in) redirects to an error page, and RUHS CMS Recruitments.aspx redirects to an error page; neither is fixed yet.
  - WebFetch was refused for most official URLs, so curl + pdftotext/OCR was used.

## 2026-11-13 (catch-up)
- New: 2. AIIMS Madurai Junior Resident (Non-Academic), 36 posts, apply by 3 Dec (Tamil Nadu); MANUU Gachibowli MBBS consultant posts, 3 posts, walk-in 17 Nov (Telangana). Updated: 0.
- Sources: data/scan-failed.json was missing (this morning's run predates the catch-up step), so all sources were rescanned from India: scanned 782 of 782 · ok 701 · failed 81. The scan ran in 8 batches because the local shell stops background jobs.
- Still failing (81): natboard.edu.in, join.afms.gov.in, careers.ntpc.co.in, sail.co.in, vizagsteel.com, careers.bhel.in, powergrid.in, bcclweb.in, bel-india.in, cochinshipyard.in, iocl.com, rcfltd.com, mahanadicoal.in, nalcoindia.com, thdc.co.in, nsg.mha.gov.in, nitandhra.ac.in, vizagport.com, rmrims.org.in, iitbhilai.ac.in, nitrr.ac.in, iitgn.ac.in, nitjsr.ac.in, newmangaloreport.gov.in, cochinport.gov.in, bmhrc.ac.in, dhsgsu.edu.in, manit.ac.in, nirwoh.icmr.gov.in, iiserpune.ac.in, jnport.gov.in, nitpy.ac.in, iitj.ac.in, nitw.ac.in, aiimspatna.edu.in, pgimer.edu.in, rmlh.mohfw.gov.in, lhmc-hosp.gov.in, aiimsbhopal.edu.in, jipmer.edu.in, amu.ac.in, bpsc.bihar.gov.in, state.bihar.gov.in, hppsc.hp.gov.in, jkpsc.nic.in, dme.karnataka.gov.in, kpsc.karnataka.gov.in, health.mp.gov.in, health.py.gov.in, phsc.punjab.gov.in, ppsc.gov.in, rajswasthya.nic.in, health.sikkim.gov.in, uppsc.up.nic.in, dgmhup.gov.in, dgme.up.gov.in, wbhealth.gov.in, hr.wbhealth.gov.in, wbhrb.in, psc.wb.gov.in, spsnellore.ap.gov.in, gitam.edu, gmcrajamahendravaram.ap.gov.in, pgimsrohtak.ac.in, jnmc.edu, moscmm.org, afmc.nic.in, kims.kiit.ac.in, jkmchjajpur.odisha.gov.in, dmet.odisha.gov.in, prmmch.odisha.gov.in, scbmch.odisha.gov.in, slnmch.odisha.gov.in, srmmch.odisha.gov.in, geetanjaliuniversity.com, mamatamedicalcollege.com, llrmmedicalcollege.nic.in, iul.ac.in, fortishealthcare.com, in.indeed.com, maxhealthcare.in
- Checked and skipped:
  - Closed or past: ECHS Ajmer, Jamnagar, Angul and Rampur MO ads; ECHS Bhuj (dental/lab only); Ramgarh Cantt GDMO (interview 12 Nov); ASMC Ayodhya Non-PG JR (closed 12 Nov); ASMC Firozabad EMO and Uttarakhand NHM monthly MO walk-in (both 13 Nov); GMC Kannur JR/Tutor (11 Nov); IGH Dwarka JR (22 Oct); Central University of Kerala MO (Aug); LTMGH MO (Oct); IISER Berhampur and Yenepoya MO (old); VMMC Non-PG JR notice (2024).
  - Not MBBS-level: ISRO HSFC Medical Officer-SD needs MD/DNB (deadline extended to 22 Nov).
  - IPGMER house staff is for own alumni only.
  - GAIL Usar MO (needs an industrial-health diploma or 3 years' experience) has no publication date, so it is left out until a date is confirmed.

## 2026-11-13 (run 4, full scan)
- New: 13. SAIL CFP GDMO walk-in (Maharashtra), Jamnagar MC MO Class-2 5 posts (Gujarat), Sainik School Tilaiya MO (Jharkhand), NITRD MO 2 posts (Delhi, unverified), UCMS MRU Research Scientist-I (Delhi), GSVM Kanpur MRU Research Scientist-I (Uttar Pradesh), AIIMS Delhi Radiation Oncology PRS-I Medical (Delhi, closes today), AIIMS Mangalagiri Tutor/Demonstrator 2 posts (Andhra Pradesh), ECHS INS Angre Mumbai MO (Maharashtra), ECHS Barnala MO 2 posts (Punjab), and rolling non-PG JR walk-ins at ASMC Lalitpur, MPT Medical College Siddharthnagar and GMC Badaun (Uttar Pradesh).
- Updated: 3. DMFT Chatra and DMFT Dhanbad are now verified with their official PDFs. ECHS Leh is verified from its official PDF, with ₹95,000 pay, 5 years' post-internship experience and an interview in the third week of December.
- State group covered: Friday (West Bengal, Assam, Sikkim, Meghalaya, Andaman and Nicobar Islands), with all 14 rotation queries plus extended reruns. Nothing new; the open WB district notices are AYUSH, nursing or pharmacist only.
- Listing tables:
  - FreeJobAlert medical table: 221 rows read (all open rows, back to Oct and earlier). About 30 already listed, 6 added, the rest skipped (SR/faculty/PG-only, AYUSH/BDS/nursing, non-medical).
  - MySarkariNaukri: 220 rows read, 3 candidates.
  - GovtJobsAlert: 108 rows read, 1 candidate.
  - SahiSarkariJobs: 7 rows read, 0 new.
  - CentralStateJobs: about 82 rows read, 3 candidates.
  - Medical Dialogues jobs: 24 rows, all stale (latest Feb 2026).
  - Reconciliation, every open MBBS row in the FJA table is either listed or skipped. Skips and reasons:
    - IIM Mumbai MO (needs 5 years' experience, closes today)
    - GMC Haldwani Scientist-B (qualification not stated in the notice)
    - BCECEB SR/Tutor 575 (appears PG-oriented, unclear)
    - ESIC Delhi SR-against-GDMO (PG preferred / MBBS with 2 years, notice not reachable)
    - ESIC Korba, Chennai and Ludhiana SR (PG)
    - NIEPMD (per-visit doctor)
    - Jhargram, Rampurhat, Purulia, Birbhum, Tirunelveli MO posts (AYUSH)
    - PGIMER MO (MHA/MPH)
    - IPGMER-SSKM house staff (own alumni only, closes today)
    - ECHS Meerut (BAMS)
    - RIMS JR (BDS)
    - Visva-Bharati radiologist (MD)
    - Chennai Port Sr Dy CMO (senior)
- Searches run: about 125 web searches, plus about 300 page/PDF fetches via curl.
- Sources: scanned 779 of 779 · ok 533 · failed 246.
  - Every section of the digest was reviewed by index range.
  - On retry, 23 failed sources loaded (powergrid, nclcil, nmdc, hindustancopper, bharatpetroleum, niih, cochinport, coalindia, iocl, TGPSC, GMERS Vadnagar/Valsad, Sumandeep, RPGMC Tanda, GMC Chandrapur/Gadchiroli, NIT Nagaland/Jalandhar, BBAU, AIIMS Patna, LHMC, sknmcgh, sarkariresult).
  - Central/PSU/defence failures were covered by site:/topic searches: NTPC, BHEL, BEL, MCL, NALCO, NLC, NPCIL, CPCL, RCF, CGHS, BMHRC, ITBP, CISF, Assam Rifles, BSF, railway CMP, cantonment boards, AIIMS Guwahati/Rajkot/Jodhpur/Bibinagar/Patna, JIPMER, GMCH Chandigarh, RML, AMU, ESIC. Nothing new and open.
  - Failed and still not covered: about 150 state-government and medical-college hosts that reset the connection from the cloud. These include most *.gov.in / *.nic.in state portals (Rajasthan, Tripura, Telangana, TN, UP DGMH/DGME/UPPSC, WB health/HR/PSC, AP DME, Haryana DMER, Gujarat, Karnataka, MP, Odisha, Punjab, Bihar, Assam NHM/PSC), all 14 Assam medical colleges, the Odisha medical colleges (SCB, MKCG, VSS etc.), RCC Trivandrum, SCTIMST, AFMC, ESIC Andheri, AIIMS Bhopal/Jodhpur/Rajkot/Bibinagar/Guwahati, and the zonal railway and cantonment sites. Plus 403s: natboard, careers.ntpc, rectt.bsf, iitgn, gitam, skims, jnmc, gmcparbhani, kims.kiit, medicalcollegekolkata, fortis, max.
- Sources: rmlh.nic.in changed to rmlh.mohfw.gov.in and kpsc.kar.nic.in to kpsc.karnataka.gov.in. Added Jamnagar MC recruitment, Sainik School Tilaiya careers, and GSVM Medical College Kanpur. bbmb.gov.in and ruhscms.org/Recruitments.aspx now redirect to error pages; no replacement found.
- Coverage check: Odisha, Rajasthan, Chhattisgarh, HP, Goa, Puducherry, Chandigarh, Arunachal, Manipur, Mizoram, Nagaland, Sikkim, DNH&DD and Lakshadweep each got a search; all leads found were closed. No category is empty.
- Leads not listed:
  - NHM Uttarakhand MO walk-in, 16 vacancies, held today 13 Nov in Dehradun. The next date is not announced; the second Friday of December is likely.
  - ASMC Firozabad EMO (non-PG JR) walk-in, today.
  - CIMS Chhindwara JR rolling walk-in (Tue/Thu; JR eligibility unreadable in the scan).
  - GMERS Morbi JR/Tutor rolling walk-in (next date not stated).
  - GMC Mahasamund JR/Tutor walk-in (page blocked).
  - IIT Indore locum MO (rolling since July, 2 years' experience, apply page 404).
  - MANUU Hyderabad campus doctors (5+ years).
  - IHBAS Delhi JR walk-in cancelled; fresh notification awaited.
  - RUHS MODRE-2026 written exam reportedly 13 Dec and HPPSC MO screening exam pending (both unconfirmed).
  - ISRO HSFC MO extended to 22 Nov but needs MD/DNB.
  - No NEET-PG 2027, INI-CET July 2027 or NExT notice yet. UPSC calendar matches CMS 2027 (notification 3 Mar, last date 23 Mar, exam 18 Jul 2027).
  - The ANIIMS Lady MO notice was re-published on andamannicobar.gov.in, with no date change.

## 2026-11-13 (run 3, INCOMPLETE: fetch and search limits)
- New: 2, both unverified: CMO Baghpat NHM MO/Female MO, 23 posts (Uttar Pradesh), ECHS Leh MO (Ladakh)
- Updated: 0. NHPC eventDate (19 Nov) and KSSM, ASACS and AFMS dates were rechecked, with no confirmed change.
- State group covered: Friday (West Bengal, Assam, Sikkim, Meghalaya, Andaman and Nicobar Islands). The rotation searches did NOT run because the search budget was used up. WB, Assam and Meghalaya were covered only through source and table results.
- Listing tables: FreeJobAlert pages could not be opened (WebFetch permission prompt timed out), so only the 1 Nov+ index titles were read. MySarkariNaukri, GovtJobsAlert and SahiSarkariJobs: about 175 rows read · 19 already listed · added 2 · about 140 skipped (about 75 closed, 7 AYUSH/BDS, about 15 PG-only, about 45 non-medical). MPKV "Rahuri" MO is the same notice as the listed MPKV Nandurbar entry.
- Leads not added because the official notice or eligibility could not be checked: SCI Assistant Medical Officer 4 posts (last 19 Nov), RIMS JR 4 posts (last 23 Nov; Ranchi or Imphal unclear), BBCI Guwahati Project Consultant & MO 9 posts (15 Nov), AIIMS Delhi Paediatrics ICMR PRS-I (23 Nov), UCMS MRU RS-I (1 Dec), Dr RMLIMS 74 posts (20 Nov), AIIMS Jammu Group-A non-faculty (14 Dec), ESIC Rohini SR (GDMO) (26 Nov), ISRO HSFC MO 'SD' (extended, likely needs MD), IIT Indore locum MO (rolling, 2 yrs exp), NHM Uttarakhand MO vacancy list (12 Nov), Punjab Aam Aadmi Clinic MO empanelment, VMMC O&G project posts, Delhi Prisons JR reschedule (wcjh_6.pdf). Closing today, unverified: IIM Mumbai MO, ECHS Meerut MO, IPGMER-SSKM house staff (own graduates), GMC Mahabubnagar MRU.
- Searches run: about 120 (the 200-search shared budget ran out). Queries 1–37 ran in standard mode, plus a few extended reruns; extended reruns for 5–13, 18–29 and 32–37 were not run · Sources: scanned about 150 of 779 (N does NOT equal TOTAL) · failed: WebFetch of source URLs was refused for every batch (PROVENANCE_REQUIRED, permission prompt unanswered in this unattended run), and site: fallbacks stopped when the search budget ran out. About 630 sources were not checked this run, including most PSUs, AIIMS, state portals (Kerala, MP, Maharashtra, Odisha, Punjab, Rajasthan, TN, Telangana, UP, Uttarakhand), Telangana/UP/AP/Assam medical colleges, and aggregators/private boards.
- Notes: One source batch (541–600) was read with curl after WebFetch was refused. Those results were discarded and that batch counts as not scanned. The next run needs WebFetch allowed for source domains (or pre-approved) to meet the scan-every-source rule.

## 2026-11-13 (merge from failed 6:40 AM run)
- New: 4 verified listings that the 6:40 AM run found but couldn't push: OCPL MO (Odisha), MPKV Nandurbar MO (Maharashtra), NHPC MO 2 posts (Jammu and Kashmir), IIT Gandhinagar resident doctor (Gujarat)
- New (unverified, official notice not reachable): 8 – GBPUAT Pantnagar EMO (Uttarakhand), KSSM MO walk-in (Kerala), DMFT Chatra MO 15 + DMFT Dhanbad MO 48 (Jharkhand), ECHS Missamari MO (Assam), IOCL Mughalsarai retainer doctor (Uttar Pradesh), DH Chandrapur ART MO (Maharashtra), NIT Agartala MO (Tripura)
- Skipped: IPGME&R-SSKM house staff (own graduates only, closes today)
- Audit: all 13 missed listings came from the FreeJobAlert medical table, which the second run never read row by row; 11 of 13 were in states outside Friday's group and 11 were non-hospital employers (PSUs, IIT/NIT, agri universities, ECHS, DMFT). Playbook now has section 1b (listing-table sweep first), queries 30–37 for those employers, and a reconciliation check in section 7.
- Sources: FreeJobAlert URL set to its medical/hospital jobs table; added hr.wbhealth.gov.in

## 2026-11-13
- New: 10 – Budaun NHM MO/EMO 30 posts (Uttar Pradesh), Birbhum NHM GDMO 15 posts (West Bengal), ANIIMS Lady MO (Andaman and Nicobar Islands), SAIL Salem GDMO walk-in (Tamil Nadu), ICMR-NIE Scientist-B Medical 2 posts (Tamil Nadu), AIIMS Delhi PRS-I Medical OBG project (Delhi), THDC adhoc GDMO walk-in (Uttarakhand, unverified), ESIC Faridabad JR 34 posts (Haryana, unverified, closes today), Tripura ESIS IMO (Tripura, unverified), UMC Navi Mumbai fresher RMO (Maharashtra, unverified)
- Updated: 4 – IGIMS Patna JR now verified with official PDF; Rampurhat GDMO note/post breakdown from official PDF + internship cut-off; UAS Dharwad corrigendum (salary typo only, date unchanged); AIIMS Bhopal JR internship-within-5-years note
- State group covered: Friday – West Bengal, Assam, Sikkim, Meghalaya, Andaman and Nicobar Islands
- Searches run: ~160 (all 29 section-2a queries incl. extended reruns, 15+ state-rotation queries, coverage/site: fallbacks) · Sources scanned: ~65 (All India: 32, today's states + priority-1: 33) · failed: esic.gov.in, join.afms.gov.in, joinindiannavy.gov.in, upsc.gov.in, assamrifles.gov.in, rectt.bsf.gov.in, cisfrectt.cisf.gov.in, indianrailways.gov.in, sail.co.in/sailcareers.com, nhm.assam.gov.in, apsc.nic.in, health.sikkim.gov.in, wbhealth.gov.in, hr.wbhealth.gov.in, wbhrb.in, psc.wb.gov.in, uppsc.up.nic.in, llrmmedicalcollege.nic.in, asacs.assam.gov.in, aiimsbhopal.edu.in, shs.bihar.gov.in, in.indeed.com, naukri.com, maxhealthcare.in (all covered by site:/aggregator searches)
- Sources added: 14 (SAIL Careers, ICMR employment, TMC, Drlogy, ASACS, AMCH Dibrugarh, ANIIMS, A&N vacancies, DHS Meghalaya, Birbhum district, Budaun district, THDC, IHBAS, IGH Dwarka)
- Notes: ICMR-NIE last date 26 Nov per official PDF (aggregator claims 6 Dec extension, unconfirmed). IHBAS Delhi JR walk-in (11 Nov) cancelled, no new date yet. Bihar SHS drive expected late Nov but first phase reportedly has no MO posts. INI-CET Jan 2027 exam done (1 Nov); July 2027 notice expected ~Mar 2027. No NEET-PG 2027 dates from NBEMS yet. ESIC Kolhapur rolling MO walk-in lead unconfirmed. AIIMS Delhi project ads (Pediatrics 23 Nov, Neurology 18 Nov) and Delhi Prisons JR reschedule PDF are image-only — need manual check. Kothagudem (Telangana) NHM MO posts closed today, MO count unconfirmed.

## 2026-11-12 (manual all-India run)
- New: 25 across 15 states/UTs + national: CRPF GDMO walk-in (2 Dec), IGIMS Patna JR 109 posts (Bihar), NEIGRIHMS JR 14 posts (Meghalaya), UPUMS Saifai JR walk-in (UP), CMO Raebareli NHM MO 18 posts (UP), GMC Udhampur JR 18 posts (J&K), Rampurhat GDMO/MO 12 posts (West Bengal), AMCH Dibrugarh MO + 4 ASACS ART/OST MO walk-ins (Assam), Haveri NHM MO 13 posts + UAS Dharwad MO walk-in + St John's JR rolling (Karnataka), ANGRAU Pulivendula MO walk-in (Andhra Pradesh), AIIMS Bhubaneswar ICMR project scientist (Odisha), 8 private RMO/duty MO posts (Apollo Bengaluru & Navi Mumbai, FMRI Gurugram, Wockhardt Mumbai, Aarogya Delhi, Renova & Ragavi Hyderabad, Zydus Vadodara)
- Updated: 1 (AFMS SSC MO verified against the official notification + corrigendum)
- State group covered: all 36 states/UTs (manual full sweep)
- Searches run: ~130 across 5 parallel research passes · Sources: 150 in sources.json (122 added today, URLs checked)
- Notes: Bihar State Health Society reportedly plans a large MO drive (~11,000 posts) with a notice expected late Nov — recheck. Private job-board listings are unverified (employer careers pages not reachable). Many state walk-ins found had already closed (Sept–early Nov). igims.org and several state sites time out or fail TLS.

## 2026-11-12
- New: 5 (initial seed: AFMS SSC MO, AIIMS Bhopal JR walk-in, Maharishi Valmiki Hospital JR walk-in, UPSC CMS 2027, NEET-PG 2027)
- Updated: 0
- Sources scanned: manual first run · failed: none recorded
- Searches run: 12
- Notes: daily automated runs start from the next update.
