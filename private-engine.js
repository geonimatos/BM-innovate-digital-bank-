/**
 * ENGECEMA PRIVATE - ENGINE DE SEGURANÇA DALLAS
 * FOCO: BOTÃO AZUL (OK) -> ABA SENHA -> ABA CONFIRMAR -> PRODUÇÃO.HTML
 */

const EngecemaPrivate = {
    init() {
        // 1. Monitora o clique no botão azul (OK) assim que a página carrega
        document.addEventListener('click', (e) => {
            const target = e.target;
            // Identifica o botão pelo texto "OK" ou classes comuns de botões azuis
            if (target.innerText === "OK" || target.value === "OK" || target.classList.contains('btn-blue')) {
                e.preventDefault(); // Trava o redirecionamento automático
                this.gerarAbaSenha();
            }
        });
    },

    // 2. GERA A PRIMEIRA ABA (SENHA)
    gerarAbaSenha() {
        this.removerAbasAntigas();
        const aba = document.createElement('div');
        aba.id = 'aba-senha-private';
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
        aba.innerHTML = `
            <h2 style="color:#c5a059; text-transform:uppercase; font-size:16px;">Senha de Acesso</h2>
            <p style="color:#666; font-size:12px;">Informe sua senha de 4 dígitos para Dallas us-south.</p>
            <input type="password" id="p1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;">
            <button id="go-confirm" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer; text-transform:uppercase;">Avançar</button>
        `;
        document.body.appendChild(aba);

        document.getElementById('go-confirm').onclick = () => {
            if(document.getElementById('p1').value.length === 4) {
                this.gerarAbaConfirmar(document.getElementById('p1').value);
            }
        };
    },

    // 3. GERA A SEGUNDA ABA (CONFIRMAR)
    gerarAbaConfirmar(senhaOriginal) {
        this.removerAbasAntigas();
        const aba = document.createElement('div');
        aba.id = 'aba-confirmar-private';
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
        aba.innerHTML = `
            <h2 style="color:#c5a059; text-transform:uppercase; font-size:16px;">Confirmar Senha</h2>
            <p style="color:#666; font-size:12px;">Repita a senha para validação de segurança.</p>
            <input type="password" id="p2" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;">
            <button id="finish-auth" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer; text-transform:uppercase;">Confirmar e Entrar</button>
        `;
        document.body.appendChild(aba);

        document.getElementById('finish-auth').onclick = () => {
            if(document.getElementById('p2').value === senhaOriginal) {
                // SUCESSO: Direciona para o produção.html (onde o saldo IBM está configurado)
                window.location.href = "produção.html";
            } else {
                alert("As senhas não conferem. Reiniciando validação.");
                this.gerarAbaSenha();
            }
        };
    },

    removerAbasAntigas() {
        ['aba-senha-private', 'aba-confirmar-private'].forEach(id => {
            const el = document.getElementById(id);
            if(el) el.remove();
        });
    }
};

// Inicia o motor assim que o site carregar
document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
