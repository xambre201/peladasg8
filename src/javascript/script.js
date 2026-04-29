document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

function logout() {
    // 1. Aqui você insere sua lógica de limpar sessão (ex: localStorage.clear())
    alert("Efetuando logout...");

    // 2. Tenta fechar a janela
    window.close();
