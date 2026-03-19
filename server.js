const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const AppConfiguration = require('ibm-appconfiguration-node-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// 1. INICIALIZAÇÃO DO COFRE (App Configuration da IBM)
const clientAppConfig = AppConfiguration.getInstance();
clientAppConfig.init(
    'us-south', // Região Dallas
    '50341044-2194-4f79-a2ac-8f45959f423d', // SEU GUID
    'tL4h5JPtO0QwCdsmpGLgvBHHabvKq1PxVN9em0M_zUqO' // SUA API KEY DO SERVIÇO
);
clientAppConfig.setContext('producao', 'producao'); // Coleção configurada no painel

// Servir arquivos estáticos (opcional se o index.html estiver na mesma pasta)
app.use(express.static(path.join(__dirname)));

let tokensAtivos = {}; // Armazenamento temporário de tokens em memória

// ROTA PRINCIPAL: REGISTRAR NO CLOUDANT E ENVIAR E-MAIL
app.post('/api/registrar', async (req, res) => {
    const { nome, email, cpf } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    tokensAtivos[cpf] = token;

    try {
        // BUSCANDO CONFIGURAÇÕES REAIS NO APP CONFIGURATION (COFRE)
        const cloudantUrl = clientAppConfig.getProperty('cloudant_url').getCurrentValue();
        const cloudantKey = clientAppConfig.getProperty('cloudant_apikey').getCurrentValue();
        const emailPass = clientAppConfig.getProperty('email_pass').getCurrentValue();

        // 2. CONEXÃO COM O CLOUDANT-YR
        const cloudant = CloudantV1.newInstance({
            authenticator: new IamAuthenticator({ apikey: cloudantKey }),
            serviceUrl: cloudantUrl
        });

        // SALVAR CLIENTE NO BANCO DE DADOS CLOUDANT
        await cloudant.postDocument({
            db: 'clientes_engecema',
            document: { 
                nome, 
                email, 
                cpf, 
                status: 'AGUARDANDO_VALIDACAO', 
                origem: 'Engecema Private Web',
                criado_em: new Date().toISOString() 
            }
        });

        // 3. CONFIGURAÇÃO DO DISPARO DE E-MAIL (NODEMAILER)
        // Utilizando sua conta pessoal geonnimatos31@gmail.com
        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { 
                user: 'geonnimatos31@gmail.com', 
                pass: emailPass // A "Senha de App" de 16 dígitos configurada na IBM
            }
        });

        await transporter.sendMail({
            from: '"Engecema Private" <geonnimatos31@gmail.com>', 
            to: email,
            subject: "Seu Token de Segurança Engecema",
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h2>Olá, ${nome}!</h2>
                    <p>Recebemos sua solicitação de abertura de conta na <b>Engecema Private</b>.</p>
                    <p>Seu código de ativação de 6 dígitos é:</p>
                    <div style="font-size: 32px; font-weight: bold; color: #2ecc71; letter-spacing: 5px; margin: 20px 0;">
                        ${token}
                    </div>
                    <p>Insira este código na tela do sistema para prosseguir.</p>
                    <hr>
                    <small>Se você não solicitou este código, por favor ignore este e-mail.</small>
                </div>
            `
        });

        res.status(200).json({ success: true, message: "Cadastro salvo e token enviado." });

    } catch (error) {
        console.error("Erro no processamento Engecema:", error);
        res.status(500).json({ error: "Falha na comunicação com os serviços IBM." });
    }
});

// ROTA: VALIDAR TOKEN (CHAMADA PELO FRONT-END)
app.post('/api/validar', (req, res) => {
    const { cpf, token } = req.body;
    if (tokensAtivos[cpf] && tokensAtivos[cpf] === token) {
        delete tokensAtivos[cpf]; // Remove após uso por segurança
        res.status(200).json({ valid: true });
    } else {
        res.status(401).json({ valid: false, message: "Token inválido ou expirado." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Engecema operando na porta ${PORT}`));
