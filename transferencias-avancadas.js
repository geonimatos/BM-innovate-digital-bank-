const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarTransferencia(tipo, valor) {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;
    let taxa = 0;

    // Lógica Moderna: TED e Internacional
    if (tipo === "TED") {
        taxa = 10.50; // Taxa de serviço
    } else if (tipo === "INTERNACIONAL") {
        const spreadCambial = 0.04; // 4% de spread
        const iof = 0.011; // 1.1% de IOF
        taxa = valor * (spreadCambial + iof);
    }

    const custoTotal = valor + taxa;

    if (conta.saldo >= custoTotal) {
      conta.saldo -= custoTotal;
      await service.putDocument({ db: 'users', docId: conta._id, document: conta });
      
      console.log(`✅ ${tipo} Realizado com Sucesso!`);
      console.log(`💰 Valor: R$ ${valor.toFixed(2)} | Taxas/Impostos: R$ ${taxa.toFixed(2)}`);
      console.log(`🏦 Novo Saldo: R$ ${conta.saldo.toFixed(2)}`);
    } else {
      console.log("❌ Saldo insuficiente para concluir a remessa.");
    }
  } catch (err) {
    console.error("❌ Erro na operação:", err.message);
  }
}

// Simulação: Enviando R$ 1.000,00 via TED (Agora o DOC não existe mais)
processarTransferencia("TED", 1000);
