/* PRIVATE-ENGINE.JS - SEGURANÇA INTEGRADA DALLAS */
(function() {
    const PrivateEngine = {
        init() {
            window.addEventListener('load', () => {
                // Captura o Botão Azul (OK) e o Botão Vermelho (Abrir Conta)
                const btnOk = document.querySelector('.btn-ok');
                const btnOpen = document.querySelector('.btn-open');

                [btnOk, btnOpen].forEach(btn => {
                    if (btn) {
                        const originalAction = btn.onclick || null;
                        const parentForm = btn.closest('form');

                        const acaoBloqueio = (e) => {
                            e.preventDefault();
                            this.faseSenha(btn);
                        };

                        if (parentForm) parentForm.onsubmit = acaoBloqueio;
                        else btn.onclick = acaoBloqueio;
                    }
                });
            });
        },

        faseSenha(targetBtn) {
            this.renderAba("SENHA DE ACESSO", "Informe sua senha Private de 4 dígitos.", (s1) => {
                if(s1.length === 4) {
                    document.getElementById('aba-dallas-io').remove();
                    this.faseConfirmar(s1, targetBtn);
                }
            });
        },

        faseConfirmar(original, targetBtn) {
            this.renderAba("CONFIRMAR SENHA", "Repita a senha para validar o terminal.", (s2) => {
                if(s1 === s2) {
                    // Após validar, libera para o fluxo real (Produtos ou Cadastro)
                    window.location.href = targetBtn.classList.contains('btn-ok') ? "produção.html" : "cadastro.html";
                } else {
                    alert("Senhas não conferem.");
                    location.reload();
                }
            });
        },

        renderAba(tit, sub, cb) {
            const div = document.createElement('div');
            div.id = 'aba-dallas-io';
            div.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:9999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-20px 0 70px #000; box-sizing:border-box;";
            div.innerHTML = `<h2 style="color:#c5a059;font-size:16px;">\${tit}</h2><p style="color:#666;font-size:12px;">\${sub}</p><input type="password" id="p-dallas" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:12px; margin:30px 0; outline:none; border-radius:4px;"><button id="btn-dallas" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px;">Avançar</button>`;
            document.body.appendChild(div);
            document.getElementById('btn-dallas').onclick = () => cb(document.getElementById('p-dallas').value);
        }
    };
    PrivateEngine.init();
})();
