// Service worker to clear cache on new deployment
const CACHE_VERSION = 'v' + Date.now();

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing new version', CACHE_VERSION);
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Service Worker: Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('Service Worker: All caches cleared');
      return self.clients.claim(); // Take control of all pages immediately
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Don't cache anything - always fetch fresh from network
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Offline', { status: 503 });
    })
  );
});
