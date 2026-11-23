// CODE MAP / COMMENTING GUIDE
// File purpose: Cultured Vault demo service worker: scoped static asset caching and basic offline navigation.
// Read from top to bottom: settings and helper functions first, followed by install, activate and fetch handlers.

/* THE CULTURED VAULT SERVICE WORKER
   Caches this demo's app shell and same-scope GET requests only.
   The worker scope is limited to the The-Cultured-Vault-demo directory.
   Increment CACHE_NAME when the cached asset list or cache strategy changes. */
const CACHE_NAME = "cultured-vault-pwa-v28";
const SCOPE_URL = new URL(self.registration.scope);

// Keep this list in sync with the files referenced by index.html and the manifest.
const APP_SHELL = [
  "./",
  "./index.html",
  "./sources.html",
  "./LICENSE",
  "./styles.css",
  "./app.js?v=2",
  "./manifest.webmanifest",
  "./icons/vault-icon.svg",
  "./icons/vault-maskable.svg"
];

// FUNCTION SECTION START: isInWorkerScope.
function isInWorkerScope(url) {
  return url.origin === SCOPE_URL.origin && url.pathname.startsWith(SCOPE_URL.pathname);
}

// Install: cache the app shell before the worker takes control.
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete older caches belonging to this demo, then claim its clients.
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith("cultured-vault-pwa-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: handle only same-origin GET requests inside this worker's own scope.
self.addEventListener("fetch", event => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || !isInWorkerScope(requestUrl)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) return cachedResponse;

    try {
      const response = await fetch(request);

      if (response.ok && response.type === "basic") {
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      // The app shell is a navigation fallback, not a substitute for failed assets.
      if (request.mode === "navigate") {
        const fallbackUrl = new URL("./index.html", SCOPE_URL);
        const fallbackResponse = await cache.match(fallbackUrl.href);

        if (fallbackResponse) return fallbackResponse;
      }

      throw error;
    }
  })());
});
