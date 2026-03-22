<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Engecema Private | Validação de Acesso</title>
    <style>
        :root {
            --bradesco-red: #cc092f;
            --private-gold: #c5a059;
            --bg-dark: #0e0e0e;
        }

        body, html { margin: 0; padding: 0; height: 100%; background: var(--bg-dark); font-family: Arial, sans-serif; overflow: hidden; }

        /* ABA DE SENHA LATERAL - ESPELHAMENTO BRADESCO */
        #aba-senha-produtos {
            position: fixed; top: 0; right: 0; width: 400px; height: 100%;
            background: #111; z-index: 10000; border-left: 1px solid var(--private-gold);
            display: flex; flex-direction: column; padding: 60px 40px;
            box-shadow: -20px 0 60px rgba(0,0,0,0.9);
            transition: transform 0.5s ease;
        }

        .aba-fechada { transform: translateX(100%); }

        .aba-header { border-bottom: 1px solid #333; padding-bottom: 25px; margin-bottom: 35px; }
        .aba-header h2 { color: var(--private-gold); font-size: 16px; text-transform: uppercase; margin: 0; letter-spacing: 2px; }
        
        input[type="password"] {
            width: 100%; padding: 20px; background: #000; border: 1px solid #444;
            color: var(--private-gold); font-size: 32px; text-align: center; letter-spacing: 12px; 
            margin-bottom: 25px; border-radius: 4px; outline: none; box-sizing: border-box;
        }

        .btn-confirmar {
            background: var(--bradesco-red); color: white; border: none;
            padding: 22px; width: 100%; font-weight: bold; cursor: pointer; 
            text-transform: uppercase; border-radius: 4px; font-size: 14px;
        }

        /* CONTEÚDO DE FUNDO (BLOQUEADO ATÉ A SENHA) */
        #painel-fomento { filter: blur(10px); pointer-events: none; padding: 80px 50px; transition: 0.5s; }

        header {
            background: #000; border-bottom: 1px solid var(--private-gold);
            padding: 15px 50px; display: flex; justify-content: space-between;
            position: fixed; top: 0; width: 100%; z-index: 1000;
        }

        .card-ativos {
            background: #1c1c1c; padding: 60px; margin: 80px auto; max-width: 1000px;
            border-left: 6px solid var(--private-gold); box-shadow: 0 15px 40px rgba(0,0,0,0.7);
        }

        .card-ativos h1 { color: var(--private-gold); font-size: 52px; margin: 15px 0; font-weight: 300; }
    </style>
</head>
<body>

<!-- 1. COMPONENTE: ABA DE SENHA LATERAL -->
<div id="aba-senha-produtos">
    <div class="aba-header">
        <img src="logo.png" alt="Bradesco" style="height: 30px; margin-bottom: 20px;">
        <h2>Senha de Acesso</h2>
        <p style="color: #666; font-size: 12px; line-height: 1.6;">Identificação necessária para acessar o painel de fomento e ativos Dallas us-south.</p>
    </div>
    
    <input type="password" id="input-senha" maxlength="4" placeholder="••••">
    <button class="btn-confirmar" onclick="validarAcesso()">Confirmar Acesso</button>
    <p id="erro-msg" style="color: #ff3333; font-size: 11px; margin-top: 20px; display: none; text-align: center;">Senha inválida para este terminal.</p>
</div>

<!-- 2. PAINEL DE GESTÃO (AO FUNDO) -->
<div id="painel-fomento">
    <header>
        <img src="logo.png" alt="Engecema Private" style="height: 35px;">
        <div style="color: var(--private-gold); font-size: 11px; font-weight: bold; letter-spacing: 2px;">● CONEXÃO SEGURA: DALLAS ENGINE</div>
    </header>

    <main class="card-ativos">
        <span style="color: #555; text-transform: uppercase; font-size: 11px; letter-spacing: 3px;">Patrimônio Consolidado sob Gestão</span>
        <h1 id="valor-ibm">R$ 1.250.000,00</h1>
        <p style="color: #333; font-size: 12px;">Sincronizado via IBM Cloudant via Webhook em tempo real.</p>
    </main>
</div>

<script>
    // FUNÇÃO QUE LIBERA O SITE
    function validarAcesso() {
        const senha = document.getElementById('input-senha').value;
        
        // Aceita qualquer senha de 4 dígitos para teste visual
        if (senha.length === 4) {
            document.getElementById('aba-senha-produtos').classList.add('aba-fechada');
            document.getElementById('painel-fomento').style.filter = 'none';
            document.getElementById('painel-fomento').style.pointerEvents = 'auto';
            document.body.style.overflow = 'auto';
            
            conectarCloudant(); // Busca os 7 documentos da IBM Cloud
        } else {
            document.getElementById('erro-msg').style.display = 'block';
        }
    }

    // CONEXÃO COM O ENDPOINT DA IBM
    const API_ENDPOINT = 'https://7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud';

    async function conectarCloudant() {
        try {
            const res = await fetch(API_ENDPOINT);
            const data = await res.json();
            const docs = data.rows.map(r => r.doc);
            
            let total = 0;
            docs.forEach(d => { if(d.valor) total += parseFloat(d.valor); });

            if (total > 0) {
                document.getElementById('valor-ibm').innerText = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            }
        } catch (e) {
            console.log("Dallas Engine: Utilizando valores em cache.");
        }
    }
</script>

</body>
</html>
