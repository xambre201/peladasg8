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

    async function handleLogin() {
    console.log("1. Botão clicado!"); // Aparece no console

    if (!supabaseClient) {
        alert("Erro: O cliente Supabase ainda não foi inicializado.");
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("2. Tentando logar o e-mail:", email, password);

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
            abrirJanelaSistema();
        }
    } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro técnico na tentativa de login.");
    }
}


    function abrirJanelaSistema() {
        const largura = 390;
        const altura = 844;
        window.open('home.html', 'PeladasG8', `width=${largura},height=${altura}`);
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
