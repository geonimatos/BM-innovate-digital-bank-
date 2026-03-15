const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function testConnection() {
  // Limpando espaços ou aspas invisíveis que o GitHub possa enviar
  const apiKey = process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim();
  const url = process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim();

  const authenticator = new IamAuthenticator({
    apikey: apiKey
  });

  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(url);

  try {
    const response = await service.getServerInformation();
    console.log("✅ Conexão com o Banco do Banco Digital estabelecida!");
    console.log("Versão do Cloudant:", response.result.version);
  } catch (err) {
    console.error("❌ Erro ao conectar no Cloudant:", err.message);
    process.exit(1);
  }
}

testConnection();
