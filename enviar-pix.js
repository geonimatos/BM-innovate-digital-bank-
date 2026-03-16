const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function enviarPix() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const valorPix = 500.00;
    
    if (conta.saldo >= valorPix) {
      console.log(`⚡ PIX ENVIADO: - R$ ${valorPix.toFixed(2)}`);
      conta.saldo -= valorPix;

      await service.putDocument({ db: 'users', docId: conta._id, document: conta });
      console.log(`✅ Pix realizado com sucesso! Novo Saldo: R$ ${conta.saldo.toFixed(2)}`);
    } else {
      console.log("❌ Saldo insuficiente para realizar o Pix.");
    }
  } catch (err) {
    console.error("❌ Erro no processamento do Pix:", err.message);
  }
}
enviarPix();
