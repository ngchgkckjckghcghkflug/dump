self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('your-cache-name').then(function(cache) {
        return cache.addAll([
          // your list of cache keys to store in cache
          'main.html',
          'mainfest.json',
          // etc.
        ])
      })
    );
  });