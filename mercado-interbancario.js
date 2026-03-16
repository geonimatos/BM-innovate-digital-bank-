const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function fecharCaixa() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    console.log("🏦 FECHAMENTO INTERBANCÁRIO");
    console.log(`📊 Taxa CDI: ${conta.taxa_cdi_alvo}% | Selic: ${conta.taxa_selic_over}%`);
    
    // Simulação de ajuste de liquidez diária (taxa simbólica de custódia)
    const custoCustodia = 0.05; 
    conta.saldo -= custoCustodia;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Caixa Ajustado na B3. Novo Saldo: R$ ${conta.saldo.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Erro no fechamento:", err.message);
  }
}
fecharCaixa();
