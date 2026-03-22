/**
 * MOTOR DE SEGURANÇA ENGECEMA PRIVATE - DALLAS ENGINE
 * STATUS: SEQUESTRO DE ROTA ATIVO | VOLUMETRIA: 75 LINHAS
 * OBJETIVO: REDIRECIONAR ADMIN.HTML (IMUTÁVEL) PARA PRODUTOS.HTML
 */

const CACHE_NAME = 'engecema-v500';
const ASSETS = ['index.html', 'produtos.html', 'private-engine.js', 'logo.png'];

self.addEventListener('install', (e) => {
    self.skipWaiting(); 
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((ks) => Promise.all(
        ks.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
    )).then(() => self.clients.claim()));
});

// A MÁGICA: Intercepta o pedido do ADMIN.HTML e entrega o PRODUTOS.HTML
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Se o clique no botão azul (OK) buscar 'admin.html', nós desviamos para 'produtos.html'
    if (url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch('produtos.html').then(response => {
                return response;
            }).catch(() => caches.match('produtos.html'))
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    }
});

/* FIM DO MOTOR DE 75 LINHAS - ENGECEMA DALLAS */
