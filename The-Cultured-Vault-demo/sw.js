/* THE CULTURED VAULT SERVICE WORKER
   Caches the static app shell for basic offline use. app.js registers this
   worker with a scope limited to this demo directory. Increment CACHE_NAME
   when the cached asset list changes or a fresh cache is required. */
const CACHE_NAME = "cultured-vault-pwa-v16";
// Keep this list in sync with the files referenced by index.html and the manifest.
const APP_SHELL = [
  "./",
  "./index.html",
  "./sources.html",
  "./sources.js",
  "./LICENSE",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/vault-icon.svg",
  "./icons/vault-maskable.svg",
  "./icons/apple-touch-icon.svg",
  "./icons/apple-touch-icon.png"
];
// Install: cache the app shell before the worker takes control.
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
// Activate: delete older caches belonging to this demo, then claim its clients.
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("cultured-vault-pwa-") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
// Fetch: use cached same-origin GET responses first; leave other requests alone.
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && response.type === "basic") {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  }).catch(() => caches.match("./index.html"))));
});