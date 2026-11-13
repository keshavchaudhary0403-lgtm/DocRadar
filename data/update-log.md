# DocRadar update log

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
