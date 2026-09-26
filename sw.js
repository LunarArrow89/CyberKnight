const CACHE_NAME = "utopia-offline-v1";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./player.js",
    "./battle.js",
    "./paths.js",
    "./village.js",
    "./save.js",
    "./game.js",
    "./animation1.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.addAll(FILES)
        )
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).then(response => {
                const copy = response.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, copy);
                });

                return response;
            }).catch(() => caches.match("./index.html"));
        })
    );
});
