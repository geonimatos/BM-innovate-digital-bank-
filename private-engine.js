/**
 * ENGECEMA PRIVATE - ENGINE DE SEGURANÇA E ATIVOS
 * STATUS: CONECTADO IBM CLOUD | VOLUMETRIA: ~67 LINHAS
 */
const EngecemaPrivate = {
    settings: {
        gold: "#c5a059", red: "#cc092f",
        db: "https://7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud"
    },

    init() {
        console.log("Iniciando Motor Dallas...");
        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('load', () => {
            // Foco no Botão Azul OK do Index Imutável
            const btnOk = document.querySelector('.btn-ok') || document.querySelector('button[type="submit"]');
            if (btnOk) {
                btnOk.closest('form').onsubmit = (e) => {
                    e.preventDefault();
                    this.fluxoSeguranca();
                };
            }
        });
    },

    fluxoSeguranca() {
        this.renderAba("SENHA DE ACESSO", "Digite sua senha de 4 dígitos.", (s1) => {
            if (s1.length === 4) {
                document.getElementById('aba-dallas-v3').remove();
                this.renderAba("CONFIRMAR SENHA", "Repita a senha para confirmar.", (s2) => {
                    if (s1 === s2) {
                        window.location.href = "produção.html"; // Vai para onde o saldo IBM já funciona
                    } else {
                        alert("Senhas não conferem.");
                        location.reload();
                    }
                });
            }
        });
    },

    renderAba(tit, sub, cb) {
        const div = document.createElement('div');
        div.id = 'aba-dallas-v3';
        div.style = `position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:9999999; border-left:2px solid ${this.settings.gold}; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-sizing:border-box; box-shadow:-20px 0 70px #000;`;
        div.innerHTML = `
            <h2 style="color:${this.settings.gold};text-transform:uppercase;font-size:16px;">${tit}</h2>
            <p style="color:#666;font-size:12px;margin-bottom:30px;">${sub}</p>
            <input type="password" id="in-dallas" maxlength="4" style="width:100%;padding:20px;background:#000;border:1px solid #333;color:${this.settings.gold};font-size:32px;text-align:center;letter-spacing:12px;margin-bottom:25px;outline:none;">
            <button id="bt-dallas" style="width:100%;padding:20px;background:${this.settings.red};color:#fff;border:none;font-weight:bold;text-transform:uppercase;cursor:pointer;">Próximo</button>
        `;
        document.body.appendChild(div);
        document.getElementById('bt-dallas').onclick = () => cb(document.getElementById('in-dallas').value);
    }
};
EngecemaPrivate.init();
