var cachePrefix = 'tabelapicanco'
var cacheVersion = 5;
var cacheName = cachePrefix + '-cache-v' + cacheVersion;

var filesToCache = [
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
  'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular-block-ui/0.2.2/angular-block-ui.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular-block-ui/0.2.2/angular-block-ui.min.css',
  'index.html',
  'tabelapicanco.ico',
  'build/bundle.js',
  'styles/app.css'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key.startsWith(cachePrefix) && key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
