const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function consultarTodosUsuarios() {
  const apiKey = process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim();
  const url = process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim();

  const authenticator = new IamAuthenticator({ apikey: apiKey });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(url);

  try {
    const response = await service.postAllDocs({
      db: 'users',
      includeDocs: true
    });

    console.log(`🏦 BANCO DIGITAL - LISTA DE CLIENTES`);
    response.result.rows.forEach(row => {
      const conta = row.doc;
      console.log(`-----------------------------------`);
      console.log(`👤 Nome: ${conta.nome || 'Não definido'}`);
      console.log(`💰 Saldo: R$ ${conta.saldo ? conta.saldo.toFixed(2) : '0.00'}`);
      console.log(`🆔 ID Real: ${conta._id}`);
    });
  } catch (err) {
    console.error("❌ Erro ao buscar no banco:", err.message);
    process.exit(1);
  }
}

consultarTodosUsuarios();
