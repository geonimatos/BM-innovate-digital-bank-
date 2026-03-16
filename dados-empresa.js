const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function registrarEmpresaReal() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // INSERÇÃO DOS DADOS REAIS DA SUA EMPRESA
    conta.empresa = {
      nome: "ENGECEMA ENGENHARIA FOMENTO E TECNOLOGIA LTDA",
      cnpj: "05.368.602/0001-10", 
      tipo: "Corporate Black",
      status: "Ativo"
    };

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`🏢 SUCESSO: Empresa ${conta.empresa.nome} registrada na nuvem.`);
  } catch (err) {
    console.error("❌ Erro ao salvar dados reais:", err.message);
    process.exit(1);
  }
}
registrarEmpresaReal();
