# Refresh Playbook — Palafrugell ↔ Cheltenham Journey Planner

This planner (`index.html`) is a single static page. **It cannot read airlines or
bus operators live** (they block scraping and there is no server). So its
timetables are re-verified on a schedule by an automated task that follows this
document, edits the data in `index.html`, and pushes to GitHub. GitHub Pages then
serves the update to the phone/PWA on next open.

> **STANDING RULE — document everything.** Every change to this app, whether made
> by the monthly task or by hand in a session, MUST add a newest-first entry to the
> CHANGELOG array in index.html AND mirror it into CHANGELOG.md, and bump VERSION.
> A data change is never pushed without a changelog line describing it.

**Cadence:** monthly. **Owner-facing dates:** the app shows `LAST_VERIFIED` and
`NEXT_VERIFIED` (near the top of the `<script>`); update both every run.

---

## Where the data lives (all inside the one `<script>` in index.html)

| What | Object | Notes |
|------|--------|-------|
| Flight schedules | `DATA.sched.<route>.su` (outbound Spain→UK) / `.us` (home UK→Spain) | Each record: `days:[0-6]` (0=Sun), `daysText:"Mon, Wed, ..."`, `dep`,`arr`,`season`,`approx`, optional `from`/`to` season bounds |
| Flight summary chips | `DATA.flights.<route>` | `days` (human string), `season`, `fare`, etc. Keep in step with `sched`. |
| Bus/coach + rail | `DATA.buses.*`, rail panels | first/last/frequency |
| Source registry / expiry | `DATA.sources[]` | `validFrom`,`validTo`,`unconfirmed`,`src` URL — drives the Admin panel |
| Freshness stamps | `LAST_VERIFIED`,`NEXT_VERIFIED`,`DATA.lastUpdated` | update every run |

Routes: `gro_brs`,`gro_bhx`,`bcn_brs`,`bcn_bhx` (home = `brs_gro`,`bhx_gro`,`brs_bcn`,`bhx_bcn` reuse the same schedule keys).

### The golden rule that prevents the recurring bug
For every flight record, `days:[...]` (numbers) and `daysText:"..."` (words) **must
describe the same days**. The in-app self-check (`validateData()`) fails loudly if
they disagree. When you change operating days, change BOTH. Never edit one alone.

---

## Sources to re-verify each run

1. **Ryanair Girona ↔ Bristol** (`gro_brs`, source `fl_gro`)
   - Verify operating days + per-day times both directions.
   - Primary: https://www.ryanair.com (Fare Finder / booking for GRO-BRS and BRS-GRO).
   - Cross-check: https://www.flightsfrom.com/GRO-BRS and /BRS-GRO (week view lists each day's time).
2. **Ryanair Girona ↔ Birmingham** (`gro_bhx`, source `fl_gro`)
   - https://www.flightsfrom.com/GRO-BHX , /BHX-GRO ; confirm days (FR4415/FR4416).
3. **Barcelona ↔ Bristol** (`bcn_brs`, source `fl_bcn`) — easyJet + Ryanair; note the summer/winter split at ~25 Oct (records carry `from`/`to`).
   - https://www.flightsfrom.com/BCN-BRS , /BRS-BCN .
4. **Barcelona ↔ Birmingham** (`bcn_bhx`, source `fl_bcn`) — Jet2/Vueling/easyJet/Ryanair.
   - https://www.flightsfrom.com/BCN-BHX , /BHX-BCN .
5. **Moventis 5/41/42** Palafrugell⇄Girona (`bus_gro`) — summer vs winter sheet. Source link in registry.
6. **Sagalés 607** Girona station⇄airport (`bus_gro_air`) — https://www.sagales.com/en/linia/607 .
7. **Moventis line 1** Palafrugell⇄Barcelona airport (`bus_bcn`).
8. **Bristol Airport Flyer A1** (`flyer`) — frequency service; rarely changes. Data now
   lives in `DATA.bristol.flyer` as headway **bands** (minutes-from-midnight): currently
   `07:00–19:00 every ~8 min`, `19:00–07:00 every ~30 min`, 24h. Re-confirm those two
   headways and the cutoffs against https://flyer.bristolairport.co.uk/ and the Bristol
   Airport "Flyer to increase services" news posts; also spot-check the Airport→Temple
   Meads ride (`rideTM`, ~25 min) and stop list. If the bands change, edit `bands[]` and
   the human-readable `freq`/`dur` strings together. The in-app "just landed?" helper and
   the frequency table both read from `bands[]`, so no other edit is needed.
9. **UK rail Cheltenham⇄Bristol/Birmingham** (`trains`) — validTo is the next UK timetable change (Dec/May/Jun). Re-pull near that date.

Only touch a source that is within 14 days of `validTo`, already expired, flagged
`unconfirmed`, or where a spot-check shows a real change. Leave valid data alone.

---

## Step-by-step for each run

1. **Get the repo** (cloud): `git clone https://<token>@github.com/Psykalist/Travel.git` (or `git pull` an existing clone). The token is a fine-grained GitHub PAT scoped to this repo with Contents: read/write.
2. **Re-verify** the due sources above via WebFetch/WebSearch. For flights, record days + a representative time per day.
3. **Edit `index.html`** — update `days`, `daysText` (keep them in step!), `dep`/`arr`, `season`, `from`/`to`, and the matching `DATA.sources[].validTo` / `verified`. Bump `DATA.lastUpdated`, `LAST_VERIFIED`, `NEXT_VERIFIED` (+1 month).
4. **Run the self-check before committing** (fails the run if data is inconsistent):
   ```bash
   python3 - <<'PY'
   import re; h=open('index.html',encoding='utf-8').read()
   big=max(re.findall(r'<script>(.*?)</script>',h,re.S),key=len)
   cut=big.index('// defaults: outbound tomorrow')
   open('/tmp/h.js','w').write(big[:cut]+"\nconst r=validateData();if(r.errors.length){console.error('SELF-CHECK FAILED');r.errors.forEach(e=>console.error(' - '+e));process.exit(1);}console.log('SELF-CHECK OK ('+r.warnings.length+' warnings)');")
   PY
   node --check /tmp/h.js && node /tmp/h.js
   ```
   Do not push if this exits non-zero.
5. **Bump `VERSION`** and add a one-line `CHANGELOG` entry (newest first) describing what actually changed. Mirror it into `CHANGELOG.md`.
6. **Commit & push**: `git commit -am "vX.Y: <what changed>" && git push`.
7. **Notify** the owner (Kieran) only if something changed or a source could not be
   confirmed — a short summary of what moved and any leg still unconfirmed. If
   nothing changed, update the stamps, still push, but keep the message minimal.

## Guardrails
- Prefer stating operating **days** confidently and times as `approx:true` when they
  swing by day — the app renders `*` and "confirm live" for those.
- Never invent a time. If a source can't be confirmed, set `unconfirmed:true` and say so.
- One record's `days[]` and `daysText` must always match. Run the self-check. Always.
