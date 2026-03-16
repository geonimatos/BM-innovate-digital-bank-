const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarMercado() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // Simulação de Câmbio e Projeção de Gráfico
    conta.cambio = { usd: (conta.saldo / 5.10).toFixed(2), eur: (conta.saldo / 5.50).toFixed(2) };
    conta.historico_7d = [1520, 1525, 1528, 1532, 1535, 1536, 1537.02];

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Mercado Global: USD $${conta.cambio.usd} | EUR €${conta.cambio.eur}`);
  } catch (err) {
    console.error("❌ Erro no processamento global:", err.message);
  }
}
processarMercado();
