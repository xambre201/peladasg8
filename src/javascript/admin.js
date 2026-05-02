// Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const SUPABASE_URL = 'SUA_URL_AQUI';
const SERVICE_ROLE_KEY = 'SUA_SERVICE_ROLE_KEY_AQUI';

// Criamos o cliente com a Service Role para ter permissão de alterar usuários
const supabaseAdmin = supabase.createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function buscarMembro() {
    const apelido = document.getElementById('apelido-busca').value.trim();
    const statusMsg = document.getElementById('nome-membro');

    if (!apelido) {
        alert("Digite um apelido para buscar.");
        return;
    }

    statusMsg.innerText = "Buscando...";

    // 1. Busca na sua tabela 'profiles' pelo apelido
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('id, full_name, email')
        .ilike('nickname', apelido) // Busca sem diferenciar maiúsculas/minúsculas
        .single();

    if (error || !data) {
        statusMsg.innerText = "Membro não encontrado!";
        statusMsg.style.color = "#ff4d4d";
        document.getElementById('email-membro').value = "";
        return;
    }

    // 2. Preenche a tela com os dados encontrados
    statusMsg.innerText = data.full_name;
    statusMsg.style.color = "#28a745";
    document.getElementById('email-membro').value = data.email;
    
    // Armazena o ID do usuário (Auth) no próprio elemento para usar depois
    document.getElementById('email-membro').dataset.userId = data.id;
}

async function atualizarSenha() {
    const userId = document.getElementById('email-membro').dataset.userId;
    const novaSenha = document.getElementById('nova-senha').value;

    if (!userId) {
        alert("Primeiro busque um membro pelo apelido.");
        return;
    }

    if (novaSenha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    // 3. Usa o comando de Admin para forçar a nova senha no Auth
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { password: novaSenha }
    );

    if (error) {
        console.error("Erro ao atualizar:", error);
        alert("Erro ao atualizar senha: " + error.message);
    } else {
        alert("Sucesso! Senha alterada.");
        document.getElementById('nova-senha').value = "";
    }
}

