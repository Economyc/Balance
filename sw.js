// ═══════════════════════════════════════════════════════════════
// BALANCE — Service Worker (Cache-first para shell, network-first para API)
// ═══════════════════════════════════════════════════════════════

// Incrementar CACHE_VERSION cuando se actualiza el app shell
const CACHE_VERSION = 2;
const CACHE_NAME = `balance-v${CACHE_VERSION}`;

// Recursos del app shell que se cachean al instalar
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './favicon.png',
  './manifest.json',
];

// ─── Install: cachear app shell ────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate: limpiar caches anteriores ───────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ─── Fetch: network-first para API/Firebase, cache-first para el resto
self.addEventListener('fetch', (event) => {
  // Ignorar solicitudes que no son GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // No cachear requests a Firebase, ESM, o Google APIs (siempre network)
  const isExternal =
    url.hostname.includes('firebasestorage') ||
    url.hostname.includes('firebaseio') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('esm.sh') ||
    url.hostname.includes('fonts.googleapis') ||
    url.hostname.includes('identitytoolkit');

  if (isExternal) {
    // Network-only para servicios externos
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first para recursos locales del app shell
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Solo cachear respuestas válidas de mismo origen
        if (
          response &&
          response.status === 200 &&
          response.type === 'basic' &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback offline: devolver la página principal para navegación
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        // Para otros recursos, retornar respuesta vacía
        return new Response('', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
