self.importScripts('js/index.min.js''Coldbox-Plus/js/main.min.js');

const cacheName = "coldbox-plus-v1";
const appShellFiles = [
  '/Coldbox-Plus/css/style.min.css'
  '/Coldbox-Plus/js/libs/EasePack.min.js
  '/Coldbox-Plus/js/libs/raf.js
  '/Coldbox-Plus/js/libs/ScrollToPlugin.min.js
  '/Coldbox-Plus/js/libs/SocialSharing.js
  '/Coldbox-Plus/js/libs/TweenMax.min.js
  '/Coldbox-Plus/js/libs/analytics.js
  '/Coldbox-Plus/js/libs/jquery.js
  '/Coldbox-Plus/js/libs/lame.min.js
  '/Coldbox-Plus/asset-v1/app.js',
  '/Coldbox-Plus/asset-v2/app.js',
  '/Coldbox-Plus/asset-v3/app.js',
  '/Coldbox-Plus/asset-v4/app.js',
  '/Coldbox-Plus/asset-v7/app.js',
  '/Coldbox-Plus/img/title.svg',
  '/Coldbox-Plus/img/title-darkmode.svg',
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })(),
  );
});

self.addEventListener("fetch", (e) => {
  console.log(`[Service Worker] Fetched resource ${e.request.url}`);
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});

contentToCache.push("/pwa-examples/js13kpwa/icons/icon-32.png");

// ...

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })(),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        }),
      );
    }),
  );
});
