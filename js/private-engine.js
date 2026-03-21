/**
 * Engecema Private - Engine Integrada (Cloudant + App Configuration)
 * Integração: IBM Cloud / GitHub / Webhook
 */

const EngecemaEngine = {
    // Configurações vindas do IBM App Configuration
    config: {
        apiUrl: "SUA_CLOUD_FUNCTION_URL_OU_WEBHOOK", // URL da action que lê o Cloudant
        refreshRate: 30000 
    },

    async fetchBankData() {
        try {
            // Chamada para buscar os dados de produtos bancários (LCI, LCA, CDB)
            // Aqui o Webhook ou App Configuration injeta os valores reais
            const response = await fetch(this.config.apiUrl);
            const data = await response.json();
            this.renderizar(data);
        } catch (error) {
            console.error("Erro ao sincronizar com IBM Cloudant:", error);
            // Fallback caso a conexão falhe
            this.renderizarFallback();
        }
    },

    renderizar(data) {
        // Atualiza CDB
        document.getElementById('taxa-cdb').innerHTML = 
            `<strong>${data.cdb_taxa}% do CDI</strong>`;
        
        // Atualiza Fundos (Cota do Cloudant)
        const fundoEl = document.querySelector('.product-card:nth-child(2) div');
        fundoEl.innerHTML = `Cota: R$ ${data.fundo_cota} <small>Atualizado via IBM Cloud</small>`;

        // Atualiza LCI/LCA
        const lciEl = document.querySelector('.product-card:nth-child(3) div');
        lciEl.innerHTML = `Rentabilidade: <strong>${data.lci_taxa}% do CDI</strong>`;
    },

    renderizarFallback() {
        // Valores de segurança caso o App Configuration esteja offline
        document.getElementById('taxa-cdb').innerText = "Consulte seu gerente Private";
    }
};

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    EngecemaEngine.fetchBankData();
});
