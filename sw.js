/**
 * SERVIDOR DE INTERCEPTAÇÃO ENGECEMA PRIVATE
 * STATUS: INJETOR DE INTERFACE | VOLUMETRIA: 75 LINHAS
 */
const CACHE_NAME = 'engecema-v200';
const ASSETS = ['index.html', 'produção.html', 'private-engine.js', 'logo.png'];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((ks) => Promise.all(
        ks.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
    )).then(() => self.clients.claim()));
});

// A MÁGICA: Injeta os campos de SENHA e CONFIRMAR no INDEX imutável
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.endsWith('index.html') || url.pathname === '/') {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                let html = await res.text();
                
                // SCRIPT QUE "CONSTRÓI" OS CAMPOS DE SENHA DENTRO DO FORMULÁRIO IMUTÁVEL
                const injecaoInterface = `
                <script>
                (function() {
                    window.addEventListener('load', function() {
                        const bar = document.querySelector('.login-bar');
                        const btn = document.querySelector('.btn-ok');
                        if (bar && btn) {
                            const s1 = document.createElement('input');
                            s1.type = 'password'; s1.placeholder = 'Senha'; s1.required = true; s1.maxLength = 4;
                            s1.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px;";
                            
                            const s2 = document.createElement('input');
                            s2.type = 'password'; s2.placeholder = 'Confirmar'; s2.required = true; s2.maxLength = 4;
                            s2.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px;";
                            
                            bar.insertBefore(s1, btn);
                            bar.insertBefore(s2, btn);
                            
                            bar.onsubmit = function(e) {
                                if(s1.value !== s2.value) {
                                    e.preventDefault();
                                    alert("Senhas não conferem!");
                                    return false;
                                }
                            };
                        }
                    });
                })();
                </script>`;
                
                // Entrega o HTML modificado com os campos novos injetados
                return new Response(html.replace('</body>', injecaoInterface + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    }
});
