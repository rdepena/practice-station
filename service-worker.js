const CACHE = 'cache-and-update';

self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            './index.html',
            './src/timer.js',
            './src/index.js',
            './src/metronome.js',
            './src/volume.js',
            './src/timer.js',
            './src/timer-worker.js',
            './src/beep.js',
            './node_modules/lit-html/lit-html.js',
            './servic-worker.js',
            './images/*'
        ]);
    }).catch(err => console.error(err));
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    }).catch(err => console.error(err));
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    }).catch(err => { 
        console.error(err);
        console.log(err);
    });
}