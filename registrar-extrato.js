const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function registrarMovimentacao() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  const transacao = {
    tipo: "PAGAMENTO",
    valor: 200.00,
    descricao: "Compra de teste no Banco Digital",
    data: new Date().toISOString()
  };

  try {
    const response = await service.postDocument({
      db: 'transactions',
      document: transacao
    });
    console.log("✅ Transação registrada no extrato com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao registrar extrato:", err.message);
  }
}
registrarMovimentacao();
