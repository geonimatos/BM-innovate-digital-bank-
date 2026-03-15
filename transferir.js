const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function realizarPagamento() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    // 1. Busca a conta atual
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // 2. Realiza a subtração (Simulando uma compra de R$ 200)
    console.log(`💸 Saldo anterior: R$ ${conta.saldo.toFixed(2)}`);
    conta.saldo -= 200.00; 

    // 3. Salva o novo saldo no Banco da IBM
    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    
    console.log(`✅ Pagamento aprovado! Novo saldo: R$ ${conta.saldo.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Erro na transação:", err.message);
  }
}
realizarPagamento();
