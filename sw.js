/* Palafrugell <-> Cheltenham Planner — service worker
   Strategy: stale-while-revalidate for same-origin GETs.
   - Offline: the cached app shell + timetables load instantly with no signal.
   - Online: every visit quietly re-fetches in the background and updates the
     cache, so the next open shows the latest weekly-refreshed timetables.
   Cross-origin requests (Ryanair, Skyscanner, National Rail, Moventis...) are
   left to the network — you can only book a live fare with a connection. */

const VERSION = 'v3';
const CACHE = 'pcp-' + VERSION;
const SHELL = [
  '.',
  'index.html',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Only manage our own origin; let booking/timetable links hit the network.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            cache.put(req, res.clone());
          }
          return res;
        })
        .catch(() => null);
      // Serve cache immediately if present; otherwise wait for the network.
      return cached || (await network) || cache.match('index.html');
    })
  );
});
