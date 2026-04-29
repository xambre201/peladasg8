document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

 function logout() {
            // 1. Verifica se a função está sendo chamada
            console.log("Botão logout clicado");

            // Limpa registros de login para que outra pessoa não use o mesmo PC/Celular
            localStorage.clear();
            sessionStorage.clear();
            // 2. Tenta fechar a janela
            window.close();

            // 3. Backup: Se window.close() falhar (comum em abas principais),
            // ele avisa o usuário ou redireciona.
            setTimeout(function() {
                if (!window.closed) {
                    alert("Para sair, feche esta aba manualmente ou use a tela de entrada.");
                }
            }, 500);
        }

