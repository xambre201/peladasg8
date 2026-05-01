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

// Configurações do seu projeto Supabase
const SUPABASE_URL = 'https://ruyvfilupwwocqbnknws.supabase.co/rest/v1/';
const SUPABASE_KEY = 'sb_secret_HwUaSmOFMUMXSwz78BU3Bg_BlxST2KI'; // Use a chave "anon public"

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function iniciarApp() {
    // Exemplo: Verificar se o usuário está logado antes de abrir a janela
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        // Se estiver logado, abre o sistema mobile
        abrirJanelaSistema();
    } else {
        // Se não estiver, você pode redirecionar para uma tela de login 
        // ou exibir um alerta
        alert("Por favor, faça login primeiro!");
    }
}

function abrirJanelaSistema() {
    const largura = 390;
    const altura = 844;
    const topo = (window.screen.height / 2) - (altura / 2);
    const esquerda = (window.screen.width / 2) - (largura / 2);

    window.open(
        'sistema_g8.html', 
        'PeladasG8', 
        `width=${largura},height=${altura},top=${topo},left=${esquerda},resizable=no`
    );
}

        function iniciarApp() {
            // Definições de tamanho mobile (iPhone 12/13)
            const largura = 390;
            const altura = 844;
            
            // Centralizar a janelinha no monitor do PC
            const topo = (window.screen.height / 2) - (altura / 2);
            const esquerda = (window.screen.width / 2) - (largura / 2);

            // Abre o seu arquivo do sistema (AJUSTE O NOME DO ARQUIVO ABAIXO)
            window.open(
                'https://html-preview.github.io/?url=https://raw.githubusercontent.com/xambre201/peladasg8/main/index.html#', // <--- Coloque aqui o nome do seu arquivo atual
                'PeladasG8', 
                `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=no`
            );
        }

        async function handleLogin() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');
        
            // 1. Tenta fazer o login
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
        
            if (error) {
                // Exibe erro se a senha ou e-mail estiverem incorretos
                messageDiv.textContent = `Erro: ${error.message}`;
            } else {
                messageDiv.style.color = "#28a745";
                messageDiv.textContent = 'Login realizado! Abrindo...';
                
                // 2. Se o login for sucesso, abre o sistema mobile
                abrirJanelaSistema();
            }
        }
        
        function abrirJanelaSistema() {
            const largura = 390;
            const altura = 844;
            const topo = (window.screen.height / 2) - (altura / 2);
            const esquerda = (window.screen.width / 2) - (largura / 2);
        
            // Abre o seu arquivo do sistema (AJUSTE O NOME DO ARQUIVO ABAIXO)
            window.open(
                'https://html-preview.github.io/?url=https://raw.githubusercontent.com/xambre201/peladasg8/main/index.html#', // <--- Coloque aqui o nome do seu arquivo atual
                'PeladasG8', 
                `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=no`
            );
        }
    function sairDaTela() {
        // Tenta fechar, se não conseguir, redireciona
        window.close();
        setTimeout(() => {
            window.location.href = "https://google.com";
        }, 500);
    }


