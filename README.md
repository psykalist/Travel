# Palafrugell ↔ Cheltenham Spa — Journey Planner

A single self-contained web page (`index.html`) that plans journeys between
Palafrugell (Costa Brava, Spain) and Cheltenham Spa (UK): both directions, all four
airport routings (Girona / Barcelona × Bristol / Birmingham), transfer buffers with
last-connection warnings, indicative costs, a date-range **or** single-date fare scan,
return **or** one-way trips, and a daytime-departure preference.

Everything is baked into the one file — no build step, no server. Just open it in a
browser, or host it on GitHub Pages.

---

## Publish it on GitHub Pages (Git Bash)

1. Create a new **empty** repository on GitHub (no README, no .gitignore).
   Note your username and the repo name.

2. In Git Bash, from **this folder** (`D:/Claude/Projects/travel`):

   ```bash
   git init
   git add index.html README.md
   git commit -m "Travel planner"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

   Replace `USERNAME` and `REPO` with your own.

3. On GitHub: **Settings → Pages → Build and deployment → Source: “Deploy from a
   branch” → Branch: `main` / `/ (root)` → Save.**

4. Wait ~1 minute. Your live page will be at:

   ```
   https://USERNAME.github.io/REPO/
   ```

   Bookmark it on your phone and laptop.

---

## Updating it later

The timetable and fare data lives in a `const DATA = { … }` block near the top of the
`<script>` in `index.html`. To refresh:

- **Easiest:** ask Claude to regenerate `index.html` (it re-checks the timetables and
  fares), drop the new file in this folder, then:

  ```bash
  git add index.html
  git commit -m "Refresh timetables"
  git push
  ```

- Or edit the values in the `DATA` block by hand and push the same way.

GitHub Pages redeploys automatically within a minute of each push.

---

## Notes

- Flight **prices** are not scraped (airlines block it) — the fare-scan links open live
  Skyscanner / Ryanair search for the dates you choose.
- Ground fares (buses, Airport Flyer, trains) are indicative ranges: advance fare at the
  low end, walk-up at the high end.
- Times can change seasonally; always confirm on the day via the “Live times” buttons.
