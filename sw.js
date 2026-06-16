// バージョンを上げるたびに CACHE_NAME も変えること（= 古いキャッシュが必ず捨てられる）
const CACHE_NAME = 'mosaic-2.3.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  // 新しいSWを待たせず、すぐ次のステップへ
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    // 自分（最新版）以外のキャッシュをすべて削除 → 古いキャッシュとの競合を防ぐ
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ページ側から「すぐ切り替えて」と言われたら待機を解除
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Only handle same-origin GET requests
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  const url = new URL(e.request.url);
  const isAppShell = e.request.mode === 'navigate' ||
    url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');

  if (isAppShell) {
    // HTML（アプリ本体）はネット優先 → 更新をすぐ反映、オフライン時だけキャッシュ
    e.respondWith(
      fetch(e.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // その他のファイルはキャッシュ優先
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
