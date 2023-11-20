const CACHE_NAME = "SW-001";
const toCache = [
  "/",
  "index.html",
  "manifest.json",
  "mobil.html",
  "peminjaman.html",
  "favicon.png",
  "assets/css/bootstrap.css",
  "assets/css/bootstrap.css.map",
  "navigation.css",
  "assets/js/bootstrap.js",
  "assets/js/bootstrap.js.map",
  "assets/js/jquery-3.6.1.min.js",
  "images/icon/car-front-fill.svg",
  "images/icon/house.svg",
  "images/icon/table.svg",
  "register.js",
  "service-worker.js",
  "cars/alphard.jpg",
  "cars/avanza.jpg",
  "cars/camry.jpg",
  "cars/fortuner.jpg",
  "cars/innova.jpg",
  "cars/xenia.jpeg",
  "cars/xenia.jpg"
];
showInstallPromotion();
self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  console.log("masuk");
  deferredPrompt = e;
  showInstallPromotion();
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Hapus cache lama", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
