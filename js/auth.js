// Exemplo simplificado de redirecionamento após login
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Erro no login: " + error.message);
    } else {
        // Buscar o papel (role) do usuário na tabela 'profiles'
        const { data: profile } = await _supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

        if (profile.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'home.html';
        }
    }
}