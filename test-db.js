const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function testConnection() {
  const authenticator = new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY
  });

  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL);

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
