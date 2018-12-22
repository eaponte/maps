var CACHE_NAME = 'open-maps-cache-v2';
var urlsToCache = [
  '/maps',
  '/maps/index.html',
  '/maps/stylesheets/main.css',
  '/maps/stylesheets/ol.css',
  '/maps/js/main.js',
  '/maps/js/ol.js',
  '/maps/images/geolocation-icon.png',
  '/maps/images/pwa-icon-144.png',
  '/maps/images/pwa-icon-152.png',
  '/maps/images/pwa-icon-192.png',
  '/maps/images/pwa-icon-512.png',
  '/maps/images/search-icon.png',
  '/maps/images/world.jpg'
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