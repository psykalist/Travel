# Changelog

All notable changes to the Palafrugell ↔ Cheltenham Spa journey planner.
Versions are also shown in-app (header badge + footer "Version history").

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
