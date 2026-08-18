/* Palafrugell <-> Cheltenham Planner — service worker
   Strategy:
   - The HTML page: NETWORK-FIRST when online (so you always get the latest
     weekly-refreshed timetables the moment you have signal), falling back to
     the cached copy when offline.
   - Icons/manifest/other same-origin assets: stale-while-revalidate.
   - Cross-origin (Ryanair, Skyscanner, National Rail, Moventis...) is left to
     the network — you can only book a live fare with a connection. */

const VERSION = 'v4';
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
  if (url.origin !== self.location.origin) return; // let booking/timetable links hit the network

  const isDoc = req.mode === 'navigate' || req.destination === 'document' ||
                url.pathname.endsWith('/') || url.pathname.endsWith('index.html');

  if (isDoc) {
    // NETWORK-FIRST for the app page: freshest content when online, cache when offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('index.html', { ignoreSearch: true }).then((r) => r || caches.match('.')))
    );
    return;
  }

  // STALE-WHILE-REVALIDATE for static assets.
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      return cached || (await network) || fetch(req);
    })
  );
});
