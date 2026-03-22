/* INJEÇÃO DE INTERFACE ENGECEMA - SENHA E CONFIRMAÇÃO */
(function() {
    const injetarCampos = () => {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk && !document.getElementById('senha-engecema')) {
            // 1. Criar Campo Senha
            const s1 = document.createElement('input');
            s1.id = 'senha-engecema'; s1.type = 'password'; s1.placeholder = 'Senha';
            s1.required = true; s1.maxLength = 4;
            s1.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            // 2. Criar Campo Confirmar
            const s2 = document.createElement('input');
            s2.id = 'confirma-engecema'; s2.type = 'password'; s2.placeholder = 'Confirmar';
            s2.required = true; s2.maxLength = 4;
            s2.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            // 3. Inserir antes do botão OK
            loginBar.insertBefore(s1, btnOk);
            loginBar.insertBefore(s2, btnOk);

            // 4. Trava de Segurança
            loginBar.onsubmit = function(e) {
                if (s1.value !== s2.value) {
                    e.preventDefault();
                    alert("As senhas não conferem!");
                    return false;
                }
            };
        }
    };

    // Tenta injetar a cada 500ms caso o site demore a carregar
    setInterval(injetarCampos, 500);
})();
