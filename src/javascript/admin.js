// Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const SUPABASE_URL = 'https://ruyvfilupwwocqbnknws.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eXZmaWx1cHd3b2NxYm5rbndzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE3NzEzMSwiZXhwIjoyMDkwNzUzMTMxfQ.dmD3HVelrzl9pLDMTVjJO1PFk89K1MVYc5JL7oYQnMo';

// Criamos o cliente com a Service Role para ter permissão de alterar usuários
const supabaseAdmin = supabase.createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Verifica se o usuário está logado ao carregar a página
window.onload = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Se não houver sessão ativa, manda de volta para o login
        alert("Acesso negado! Por favor, faça login.");
        window.location.href = 'index.html';
    }
};

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
        .from('g8_2_membros')
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

