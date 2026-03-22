/* INJEÇÃO DE SEGURANÇA DALLAS - FORÇAR ABA DE SENHA */
(function() {
    // Só injeta se a aba ainda não existir na tela
    if (document.getElementById('aba-porteiro-dallas')) return;

    const css = `
        #aba-porteiro-dallas { position:fixed!important; top:0!important; right:0!important; width:400px!important; height:100vh!important; background:#111!important; z-index:9999999!important; border-left:2px solid #c5a059!important; padding:60px 40px!important; box-shadow:-25px 0 70px #000!important; color:#fff!important; font-family:Arial!important; display:flex!important; flex-direction:column!important; box-sizing:border-box!important; }
        .in-dallas { width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none; border-radius:4px; }
        .bt-dallas { width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px; }
    `;
    const st = document.createElement('style'); st.innerHTML = css; document.head.appendChild(st);

    const div = document.createElement('div');
    div.id = 'aba-porteiro-dallas';
    let s1 = "";

    const render = (tit, sub, btn) => {
        div.innerHTML = '<img src="logo.png" style="height:30px;margin-bottom:25px;"><h2 style="color:#c5a059;font-size:16px;">'+tit+'</h2><p style="color:#666;font-size:12px;">'+sub+'</p><input type="password" id="p-d" class="in-dallas" maxlength="4" placeholder="••••"><button class="bt-dallas" id="b-d">'+btn+'</button>';
        document.body.appendChild(div);
        document.getElementById('b-d').onclick = () => {
            const val = document.getElementById('p-d').value;
            if(val.length === 4) {
                if(s1 === "") { 
                    s1 = val; 
                    render("CONFIRMAR SENHA", "Repita a senha para validar o acesso Dallas.", "CONFIRMAR E ENTRAR"); 
                } else if(val === s1) { 
                    div.style.display="none"; 
                    // Se for o clique no azul, o navegador segue o fluxo original
                } else { 
                    alert("Senhas não conferem."); location.reload(); 
                }
            }
        };
    };
    render("SENHA DE ACESSO", "Identificação Dallas requerida. Informe sua senha de 4 dígitos.", "AVANÇAR");
})();
