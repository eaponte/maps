var CACHE_NAME = 'open-maps-cache-v1';
var urlsToCache = [
  '/eaponte.github.io/maps',
  '/eaponte.github.io/maps/index.html',
  '/eaponte.github.io/maps/stylesheets/main.css',
  '/eaponte.github.io/maps/stylesheets/ol.css',
  '/eaponte.github.io/maps/js/main.js',
  '/eaponte.github.io/maps/js/ol.js',
  '/eaponte.github.io/maps/images/geolocation-icon.png',
  '/eaponte.github.io/maps/images/pwa-icon-144.png',
  '/eaponte.github.io/maps/images/pwa-icon-152.png',
  '/eaponte.github.io/maps/images/pwa-icon-192.png',
  '/eaponte.github.io/maps/images/pwa-icon-512.png',
  '/eaponte.github.io/maps/images/search-icon.png',
  '/eaponte.github.io/maps/images/world.jpg'
];

self.addEventListener('install', function(event) {
	// console.log('Install!');
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);

});

// This activates when the service worker is updated; increment the version of CACHE_NAME to trigger the 'activate'
// This updates the cache whenever any of the app shell files change
self.addEventListener('activate', function(event) {
	console.log('Finally active. Ready to start serving content!');  
	event.waitUntil(
	    caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== CACHE_NAME) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
  return self.clients.claim();

});

// Return cached responses
self.addEventListener('fetch', function(event) {
	console.log('Fetch!', event.request);
	event.respondWith(
	    caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}
				return fetch(event.request);
			})
	);
});