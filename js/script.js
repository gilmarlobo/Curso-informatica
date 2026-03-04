async function deslogar() {
    const { error } = await _supabase.auth.signOut();
    if (!error) {
        window.location.href = 'index.html';
    } else {
        alert("Erro ao sair: " + error.message);
    }
}

// Exemplo: document.getElementById('btnLogout').addEventListener('click', deslogar);