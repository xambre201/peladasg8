// 1. AS CONFIGURAÇÕES DEVEM VIR PRIMEIRO DE TUDO
const SUPABASE_URL = 'https://SUA_URL_AQUI.supabase.co'; // Verifique se a sua URL está completa
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI'; 

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. AGORA AS FUNÇÕES E EVENTOS
document.getElementById('open_btn')?.addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

// Só roda o carregarUsuario se estiver na tela do sistema (onde existe o elemento 'user-name')
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('user-name')) {
        carregarUsuario();
    }
});

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        messageDiv.textContent = `Erro: ${error.message}`;
    } else {
        messageDiv.style.color = "#28a745";
        messageDiv.textContent = 'Login realizado! Abrindo...';
        abrirJanelaSistema();
    }
}

function abrirJanelaSistema() {
    const largura = 390;
    const altura = 844;
    const topo = (window.screen.height / 2) - (altura / 2);
    const esquerda = (window.screen.width / 2) - (largura / 2);

    window.open(
        'https://html-preview.github.io/?url=https://raw.githubusercontent.com/xambre201/peladasg8/main/index.html#', 
        'PeladasG8', 
        `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=no`
    );
}

function sairDaTela() {
    window.close();
    setTimeout(() => {
        window.location.href = "https://google.com";
    }, 500);
}

async function carregarUsuario() {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) {
            const nomeUsuario = user.user_metadata.full_name || "Jogador";
            const campoNome = document.getElementById('user-name');
            if (campoNome) campoNome.textContent = nomeUsuario;
        }
    } catch (e) {
        console.log("Usuário não logado ou erro na sessão.");
    }
}
