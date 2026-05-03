console.log("Script.js carregado!");

var supabaseClient;

    window.onload = function() {
        // Suas chaves (URL e KEY)
       const URL = 'https://ruyvfilupwwocqbnknws.supabase.co'; // Verifique se a sua URL está completa
       const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eXZmaWx1cHd3b2NxYm5rbndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNzcxMzEsImV4cCI6MjA5MDc1MzEzMX0.vb9aa_dXhqXWKm5GBlvYFSAHxmUkrUG-zZYxrbR1has'; 

        // Agora a biblioteca SEMPRE estará disponível pois é local
        if (window.supabase) {
            supabaseClient = window.supabase.createClient(URL, KEY);
            console.log("✅ Supabase carregado localmente com sucesso!");
        } else {
            console.error("Erro ao ler o arquivo local src/javascript/supabase-lib.js");
        }
    };

    async function handleLogin(valor) {
    console.log("1. Botão clicado! -> ",valor); // Aparece no console

    if (!supabaseClient) {
        alert("Erro: O cliente Supabase ainda não foi inicializado.");
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("2. Tentando logar o e-mail:", email, password);

    alert("2. Tentando logar o e-mail:", email, password);
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.log("3. Erro retornado pelo Supabase:", error.message);
            document.getElementById('message').textContent = "Erro: " + error.message;
        } else {
            console.log("3. Login com sucesso! Dados:", data);
            alert("Sucesso! Abrindo o sistema...");

            // ... dentro do seu handleLogin após o sucesso ...
            if (data.user) {
                console.log("Login com sucesso!");
                
                // 1. Salva no navegador que o usuário está logado (opcional, mas bom)
                localStorage.setItem('usuario_logado', data.user.email);
            
                // 2. Redireciona para a página de administração
                // Se quiser que apenas VOCÊ (admin) entre aqui, pode fazer:
                if (data.user.email === 'grupog8kennedy@gmail.com' && valor === 2) {
                    window.location.href = 'admin.html';
                } else {
                    // Se for um usuário comum, manda para outra tela ou dá boas-vindas
                    document.getElementById('message').innerText = "Bem-vindo, " + data.user.email;
                }
            }
            
            abrirJanelaSistema(valor);
        }
    } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro técnico na tentativa de login.");
    }
}


    function abrirJanelaSistema(valor) {
        const largura = 360;
        const altura = 644;
     
        if (valor === 1 ) {
           window.open('home.html', 'PeladasG8', `width=${largura},height=${altura}`);
        }
             
    }

    function sairDaTela() {
        window.close();
        setTimeout(() => {
            window.location.href = "https://google.com";
        }, 500);
    }
// Função para abrir/fechar o menu
document.querySelector('.dropdown a').addEventListener('click', function(e) {
    e.preventDefault();
    const menu = document.querySelector('.dropdown-menu');
    menu.classList.toggle('show'); // Adiciona ou remove a classe que mostra o menu
});

function carregarTela(tela) {
    const main = document.getElementById('main-content');
    
    // 1. Fecha o menu imediatamente ao selecionar
    const menu = document.querySelector('.dropdown-menu');
    menu.classList.remove('show');

    // 2. Lógica de troca de conteúdo (exemplo)
    if (tela === 'usuarios') {
        main.innerHTML = `<h2>Lista de Usuários</h2>`;
        // Aqui você chamaria sua função do Supabase
    } else if (tela === 'convidados') {
        main.innerHTML = `<h2>Lista de Convidados</h2>`;
    }  else if (tela === 'Presencas') {
        main.innerHTML = `<h2>Confirme sua Presença</h2>`;
    }  else if (tela === 'chegadas') {
        main.innerHTML = `<h2>Ordem de Chegada</h2>`;
    } else if (tela === 'noticias') {
        main.innerHTML = `<h2>Noticias</h2>`;
    }
}



    

