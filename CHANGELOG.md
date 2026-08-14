# Changelog

All notable changes to the Palafrugell ↔ Cheltenham Spa journey planner.
Versions are also shown in-app (header badge + footer "Version history").

## [2.8] — 2026-08-14
- Barcelona⇄Birmingham flight options now list real per-day times for all four
  carriers (Jet2, Vueling, easyJet, Ryanair), not just Jet2. Times pulled from
  FlightsFrom for the summer schedule; shown as approximate because they shift
  day-to-day (each row notes the day exceptions, exact time on the link).
- The weekly refresh task now re-pulls these BCN⇄BHX times from FlightsFrom, and
  the source expires with the summer season (~24 Oct) so the winter schedule
  gets pulled after that.

## [2.7] — 2026-08-14
- Airline logo chips now have a thin black border and more breathing room around
  them (spacing bumped to 10px on each side, up from 6px on the right only).

## [2.6] — 2026-08-12
- Colour tuning: darker blue page background, reddish-pastel preferences bar,
  pale-yellow action buttons, airline names in dark blue, and "no flights" text
  in red.
- Airlines now show as brand-coloured **wordmark chips** — the airline name set
  in its brand colours (Ryanair navy/yellow, easyJet orange, Jet2 red, Vueling
  yellow), aligned to the row height. These are self-contained logo stand-ins;
  real airline logos are copyrighted and can't be hotlinked in the sandbox.

## [2.5] — 2026-08-12
- UI refresh aimed at fitting the initial choices on one screen: pastel-blue
  theme (less stark white), a **CT** circle logo + browser favicon, the intro
  banner collapsed behind a small **?** at top-right, a bolder green **plan this**
  button, the four routings shown as large **two-per-row** buttons, and a more
  compact preferences bar (return/second-date fields hide in one-way / single-date).

## [2.4] — 2026-08-12
- **Itinerary generator.** Tap **"plan this"** on any flight to get a full
  door-to-door plan: coach Palafrugell→airport, the flight, Airport Flyer /
  Air-Rail, the train(s) to Cheltenham — and the reverse homebound — each with
  computed times and buffers (2h check-in + realistic transfer times).
- Picks the actual coach from the stored timetable, flags last-connection risk,
  pre-5am train departures, and long airport waits, links every leg, and has a
  Copy button. Train times are computed from typical durations (confirm live).

## [2.3] — 2026-08-11
- **Expiry-gated refresh policy.** The weekly task now leaves a source untouched
  while it's still valid and only re-pulls it within ~14 days of its printed
  expiry (or once expired); on success it records the new expiry, which gates the
  next attempt. Documented in the Admin panel — most weeks the task does nothing.
- **Direct flights only, ≤3 hours** — enforced in the app (routes over 3h are
  hidden) and in the weekly task (never stores connecting or >3h flights). All
  four routings already qualify (~2h–2h15).

## [2.2] — 2026-08-11
- Added a **data-source registry**: every static timetable (Airport Flyer,
  Moventis buses, flight seasons, UK rail, FX) is stored with the validity/expiry
  dates printed on it and its source link.
- New **Admin panel** flags each source as OK / expiring-soon (≤30 days) /
  expired, with a summary of how many need attention. It currently flags the
  off-season Moventis Girona & Barcelona bus sheets as expired (they ran to
  30 Jun 2026), so the current summer timetables need pulling.
- The weekly task now checks expiry first and re-pulls anything expired or due,
  updating each source's validTo to the new sheet's printed dates.

## [2.1] — 2026-08-11
- Flight links now open the live booking site **pre-filled with your date and
  route** on the primary button (Ryanair natively; Skyscanner-by-date for
  easyJet / Jet2 / Vueling), with a direct-to-airline link beside it.
- Documented the limits: UK train sites can't be reliably date-linked (they use
  non-public internal station IDs) and Moventis serves static PDF timetables, so
  those links set the route/timetable but not a specific date.

## [2.0] — 2026-08-11
- Pulled the real **Moventis bus timetables** from the official sources:
  Palafrugell ⇄ Girona (line E3, ~1h40) and Palafrugell ⇄ Barcelona Airport
  (line 1, ~2h45), shown in a collapsible panel with the departure times each
  direction and links to the official timetables. Off-season Mon–Fri; the
  weekly task refreshes them alongside the flights.
- **Colour:** warmer theme with a soft gradient background and a coloured hero
  header, instead of plain white.

## [1.9] — 2026-08-11
- **Arrival time & connection safety.** Each flight now shows the door-to-door
  arrival time in Cheltenham (or Palafrugell homebound) and a green/amber/red
  flag for the last onward train/coach — e.g. a 22:10 Bristol landing shows
  "misses last train (23:00) — plan an overnight".
- **Total journey time** shown on every routing (door-to-door), so the cheaper
  Barcelona routings' extra coach time is visible.
- **Sort** the compare panel by cheapest / fastest / earliest arrival.
- **Remembers your settings** (dates, daytime preference, travellers, sort) and
  reflects them in the URL, so you can bookmark or share a specific search.
- **Mobile polish:** sticky date bar on desktop and larger tap targets on phones.

## [1.8] — 2026-08-11
- Progressive disclosure. Selecting a routing from the compare panel now hides
  the other three and shows only that route's flights, transfers (Airport Flyer
  + train, or train via New Street) and cost, with a "Compare all four" back
  button. Reduces on-screen clutter to just what's relevant.
- The cheapest routing that actually flies your chosen date is highlighted
  **green** with a "Good value" badge (based on typical fares — confirm with the
  live price links). Routings with no flight that day are greyed out.

## [1.7] — 2026-08-11
- Added a **compare-all overview** at the top of each direction. Pick a date and
  it shows all four routings side by side — which carriers fly that day, their
  times, daytime fit, and the indicative cost — so you can compare at a glance
  without opening each routing. Tap a card to drill into the full legs/options.

## [1.6] — 2026-08-11
- Brought every carrier on each route into scope. Barcelona–Bristol now models
  easyJet and Ryanair; Barcelona–Birmingham models Jet2, Vueling, easyJet and
  Ryanair (Girona routes remain Ryanair-only).
- Fixed-time services (e.g. Jet2 LS1337/1338, easyJet BCN–BRS) show as dated
  rows with a daytime tag; carriers whose times vary day-to-day are listed as
  "Also on this route" with a per-carrier booking link plus an all-airlines link.

## [1.5] — 2026-08-11
- Tightened flight schedules with representative departure/arrival times and
  per-route "varies" notes (e.g. FR9335 alternates a ~09:40 and ~15:35 slot;
  Barcelona routes run several flights across the day).
- Added visible version control: a version badge in the header and an
  expandable version history in the footer.
- Rewired the weekly background task to also refresh the flight **schedules**
  (days/times), and to write both the sidebar artifact and this hosted
  `index.html` — no manual editing of the data required.

## [1.4] — 2026-08-11
- Replaced the plain fare scan with a schedule-aware **Flight options** list:
  shows only the days each route actually flies, with carrier/flight number,
  times, a daytime-fit tag, and a per-day live price link. Non-flying days are
  shown greyed out.
- Fixed a timezone off-by-one that shifted the date list by a day in +ve
  timezones.

## [1.3] — 2026-08-11
- Added **one-way** trips (either direction) and a **single-date** mode
  alongside date ranges. Cost estimate switches between return and one-way.

## [1.2] — 2026-08-11
- Added an indicative **cost estimator** per routing (flights + Spanish coach +
  UK ground, scaling with traveller count).
- Added a **date-range fare scan** and a **daytime-departure preference**
  (08:00–20:00 / relaxed / any) that tags each flight.

## [1.1] — 2026-08-11
- Added **transfer buffers** and last-connection warnings on every routing
  (e.g. last Bristol/Birmingham train, last Girona/Barcelona coach).

## [1.0] — 2026-08-11
- Initial planner: both directions, four airport routings
  (Girona/Barcelona × Bristol/Birmingham), with live links to the buses,
  Airport Flyer, trains and flight search for each leg.
