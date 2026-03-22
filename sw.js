/* SERVICE WORKER ENGECEMA - ATUALIZADOR DE CACHE DALLAS */
const CACHE_NAME = 'engecema-private-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força a atualização para a nova versão com Aba de Senha
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      'index.html',
      'logo.png',
      'private-engine.js',
      'produtos.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  // Estratégia: Tenta rede primeiro para garantir a segurança da aba
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});
