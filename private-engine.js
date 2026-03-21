/**
 * Engecema Private - Engine de Integração Bancária (v1.0.3)
 * Localização: Raiz do repositório | Região: Dallas (us-south)
 * Credenciais: serviço-private
 */

const EngecemaPrivate = {
    settings: {
        apiKey: "G4mi3uBOjSMFifAA1Bhj6O7rEbZ5FBNyeJG7YH9fxg_n", 
        guid: "50341044-2194-4f79-a2ac-8f45959f423d", 
        region: "us-south", 
        collectionId: "engecema-private-collection" 
    },

    /**
     * Inicializa a conexão com a IBM Cloud
     */
    async init() {
        console.log("Engecema Private: Sincronizando com IBM Cloud Dallas...");
        await this.fetchData();
        
        // Atualização automática a cada 5 minutos
        setInterval(() => this.fetchData(), 300000);
    },

    /**
     * Busca dados reais do App Configuration em Dallas
     */
    async fetchData() {
        const url = `https://${this.settings.region}://{this.settings.guid}/collections/${this.settings.collectionId}/values`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.settings.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Status: ${response.status}`);
            
            const data = await response.json();
            console.log("Engecema Private: Dados recebidos com sucesso.");
            this.render(data.properties || {});
        } catch (error) {
            console.error("Engecema Private: Erro na conexão. Ativando Fallback.", error);
            this.renderFallback();
        }
    },

    /**
     * Renderiza os valores na interface do produtos.html
     */
    render(props) {
        // Mapeamento dinâmico baseado nos IDs que você criou na IBM Cloud
        const taxaCdb = props.taxa_cdb?.value || "102";
        const cotaPrivate = props.cota_private?.value || "2.450,32";
        const taxaLci = props.taxa_lci?.value || "94";

        if(document.getElementById('taxa-cdb')) {
            document.getElementById('taxa-cdb').innerHTML = `<strong>${taxaCdb}% do CDI</strong>`;
        }
        if(document.getElementById('taxa-fundos')) {
            document.getElementById('taxa-fundos').innerHTML = `Cota: R$ ${cotaPrivate}`;
        }
        if(document.getElementById('taxa-lci')) {
            document.getElementById('taxa-lci').innerHTML = `<strong>${taxaLci}% do CDI</strong>`;
        }
    },

    /**
     * Valores de segurança (Offline Mode)
     */
    renderFallback() {
        const fallback = { cdb: "102%", cota: "2.450,32", lci: "94%" };
        if(document.getElementById('taxa-cdb')) document.getElementById('taxa-cdb').innerText = fallback.cdb + " do CDI";
        if(document.getElementById('taxa-fundos')) document.getElementById('taxa-fundos').innerText = "Cota: R$ " + fallback.cota;
        if(document.getElementById('taxa-lci')) document.getElementById('taxa-lci').innerText = fallback.lci + " do CDI";
    }
};

// Dispara a execução ao carregar a página
document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
