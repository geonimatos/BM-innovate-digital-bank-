const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const AppConfiguration = require('ibm-appconfiguration-node-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// 1. CONEXÃO COM O COFRE (App Configuration)
const clientAppConfig = AppConfiguration.getInstance();
clientAppConfig.init(
    'us-south', // Região (Dallas) conforme sua lista de recursos
    '50341044-2194-4f79-a2ac-8f45959f423d', // SEU GUID
    'tL4h5JPtO0QwCdsmpGLgvBHHabvKq1PxVN9em0M_zUqO' // SUA API KEY DO SERVIÇO
);
clientAppConfig.setContext('producao', 'producao'); // Coleção que criamos

let tokensAtivos = {};

// ROTA PRINCIPAL DE CADASTRO
app.post('/api/registrar', async (req, res) => {
    const { nome, email, cpf } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    tokensAtivos[cpf] = token;

    try {
        // BUSCANDO CONFIGURAÇÕES DO COFRE EM TEMPO REAL
        const cloudantUrl = clientAppConfig.getProperty('cloudant_url').getCurrentValue();
        const cloudantKey = clientAppConfig.getProperty('cloudant_apikey').getCurrentValue();
        const emailPass = clientAppConfig.getProperty('email_pass').getCurrentValue();

        // 2. CONEXÃO COM O CLOUDANT-YR
        const cloudant = CloudantV1.newInstance({
            authenticator: new IamAuthenticator({ apikey: cloudantKey }),
            serviceUrl: cloudantUrl
        });

        // SALVANDO NO BANCO DE DADOS
        await cloudant.postDocument({
            db: 'clientes_engecema',
            document: { nome, email, cpf, status: 'TOKEN_ENVIADO', data: new Date().toISOString() }
        });

        // 3. ENVIO DO E-MAIL (NODEMAILER)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'seu-email-aqui@gmail.com', pass: emailPass }
        });

        await transporter.sendMail({
            from: '"Engecema Private" <seu-email-aqui@gmail.com>',
            to: email,
            subject: "Seu Token de Ativação Engecema",
            text: `Olá ${nome}, seu código de ativação é: ${token}`
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Erro na operação:", error);
        res.status(500).json({ error: "Falha ao processar cadastro" });
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Sistema Engecema Operacional"));
