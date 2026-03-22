/**
 * ENGECEMA PRIVATE - ENGINE DALLAS (US-SOUTH)
 * FOCO: INJEÇÃO DE ABAS DE SEGURANÇA SEM ALTERAR HTMLS IMUTÁVEIS
 */

const PrivateEngine = {
    init() {
        // Monitora o clique no botão azul (OK) no index.html imutável
        document.addEventListener('click', (e) => {
            if (e.target.innerText === "OK" || e.target.value === "OK") {
                e.preventDefault(); 
                this.gerarAbaSenha();
            }
        });
    },

    gerarAbaSenha() {
        const aba = document.createElement('div');
        aba.id = 'seguranca-private-aba';
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
        aba.innerHTML = `
            <h2 style="color:#c5a059; text-transform:uppercase; font-size:16px;">Senha de Acesso</h2>
            <p style="color:#666; font-size:12px;">Identificação Dallas us-south.</p>
            <input type="password" id="s1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;">
            <button id="btn-p1" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">AVANÇAR</button>
        `;
        document.body.appendChild(aba);

        document.getElementById('btn-p1').onclick = () => {
            if(document.getElementById('s1').value.length === 4) {
                const s1 = document.getElementById('s1').value;
                aba.remove();
                this.gerarAbaConfirmar(s1);
            }
        };
    },

    gerarAbaConfirmar(senhaOriginal) {
        const aba = document.createElement('div');
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
        aba.innerHTML = `
            <h2 style="color:#c5a059; text-transform:uppercase; font-size:16px;">Confirmar Senha</h2>
            <p style="color:#666; font-size:12px;">Repita a senha para validar.</p>
            <input type="password" id="s2" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;">
            <button id="btn-p2" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">CONFIRMAR E ENTRAR</button>
        `;
        document.body.appendChild(aba);

        document.getElementById('btn-p2').onclick = () => {
            if(document.getElementById('s2').value === senhaOriginal) {
                // SUCESSO: Libera o acesso para o admin.html (fluxo original)
                window.location.href = "admin.html";
            } else {
                alert("As senhas não conferem.");
                location.reload();
            }
        };
    }
};

document.addEventListener('DOMContentLoaded', () => PrivateEngine.init());
