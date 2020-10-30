importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
  console.log(`Workbox berhasil dimuat`);
}else{
  console.log(`Workbox gagal dimuat`);
}
   workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/tim.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/kelasmen.html', revision: '1' },
    { url: '/pages/favorite.html', revision: '1' },
    { url: '/pages/jadwal.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/gambar/icon-fa-512x512.png', revision: '1' },
    { url: '/gambar/icon-fa-192x192.png', revision: '1' },
    { url: '/gambar/epl.png', revision: '1' },
    { url: '/gambar/loading.gif', revision: '1' },
    { url: '/manifest.json', revision: '1' },
  ]);

  workbox.routing.registerRoute(
  new RegExp('http://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'data-football',
        plugins: [
        new workbox.cacheableResponse.Plugin( {
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin( {
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 100,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate( {
      cacheName: 'images',
      plugins: [
        new workbox.cacheableResponse.Plugin( {
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin( {
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 100,
        }),
      ]
    })
  );

 self.addEventListener('push', event => {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
       body = 'Push message no payload';
     }
     let options = {
       body: body,
       icon: 'gambar/icon-fa-192x192.png',
       vibrate: [100, 50, 100],
       data: {
       dateOfArrival: Date.now(),
       primaryKey: 1
      }
     };
     event.waitUntil(
      self.registration.showNotification('Push Notification', options)
     );
  });