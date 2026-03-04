async function checkAdmin() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    if (!user) {
        window.location.href = 'index.html'; // Se não está logado, volta pro login
        return;
    }

    const { data: profile } = await _supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile.role !== 'admin') {
        alert("Acesso negado!");
        window.location.href = 'home.html'; // Se for aluno, manda pra home dele
    }
}
checkAdmin();

// Função para verificar se o usuário já está logado
async function verificarSessao() {
    const { data: { session }, error } = await _supabase.auth.getSession();

    if (session) {
        // Se houver sessão, buscamos o perfil para saber para onde mandar
        const { data: profile } = await _supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

        if (profile?.role === 'admin') {
            window.location.href = 'admin.html';
        } else if (profile?.role === 'aluno') {
            window.location.href = 'home.html';
        }
    }
}

// Executa ao carregar a página de index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    verificarSessao();
}