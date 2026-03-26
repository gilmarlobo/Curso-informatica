// aula.js - Lógica comum para páginas de aulas

async function marcarConcluida(modulo, aulaNumero) {
    console.log("Marcando concluída - Módulo:", modulo, "Número:", aulaNumero); // Debug

    if (!modulo || aulaNumero === 0) {
        alert("Erro: Módulo ou número da aula não identificado. Verifique o título da página.");
        return;
    }

    if (!window._supabase) {
        alert("Erro: Conexão com Supabase não estabelecida.");
        return;
    }

    const { data: { session } } = await window._supabase.auth.getSession();
    if (!session) {
        alert("Você precisa estar logado para marcar a aula como concluída.");
        window.location.href = "../index.html";
        return;
    }

    const btn = document.getElementById('btn-concluir');
    if (!btn) return;

    btn.innerText = "Salvando...";
    btn.disabled = true;

    try {
        const { error } = await window._supabase
            .from('progresso_aulas')
            .upsert({
                user_id: session.user.id,
                modulo: modulo,
                aula_numero: aulaNumero,
                concluida: true,
                data_conclusao: new Date().toISOString()
            }, { onConflict: 'user_id,modulo,aula_numero' });

        if (error) throw error;

        alert("Aula marcada como concluída!");
        btn.innerText = "Aula Concluída";
        btn.style.backgroundColor = "#28a745";
    } catch (err) {
        alert("Erro ao salvar progresso: " + err.message);
        btn.innerText = "Marcar Aula como Concluída";
        btn.disabled = false;
    }
}

// Função para inicializar baseada no título da página ou meta
function initAula() {
    const title = document.title;
    let modulo = "";
    let aulaNumero = 0;

    console.log("Título da página:", title); // Debug

    // Extrair módulo e número do título (ex: "Aula 01 - História e Digitação" -> Fundamentos da Informatica, 1)
    if (title.includes("Aula 01") && (title.includes("História") || title.includes("Introdução"))) {
        modulo = "Fundamentos da Informatica";
        aulaNumero = 1;
    } else if (title.includes("Aula 02") && title.includes("Tipos")) {
        modulo = "Fundamentos da Informatica";
        aulaNumero = 2;
    } else if (title.includes("Aula 03") && title.includes("Hardware")) {
        modulo = "Fundamentos da Informatica";
        aulaNumero = 3;
    } else if (title.includes("Aula 04") && title.includes("Metadados")) {
        modulo = "Fundamentos da Informatica";
        aulaNumero = 4;
    } else if (title.includes("Aula 05") && title.includes("Extensões")) {
        modulo = "Fundamentos da Informatica";
        aulaNumero = 5;
    } else if (title.includes("Aula 06") && title.includes("Tamanho")) {
        modulo = "Fundamentos da Informatica";
        aulaNumero = 6;
    } else if (title.includes("Aula 01") && title.includes("Sistema Operacional")) {
        modulo = "Sistema Operacional";
        aulaNumero = 1;
    } else if (title.includes("Aula 02") && title.includes("Pastas e Diretórios")) {
        modulo = "Sistema Operacional";
        aulaNumero = 2;
    } else if (title.includes("Aula 03") && title.includes("Aplicativos")) {
        modulo = "Sistema Operacional";
        aulaNumero = 3;
    } else if (title.includes("Word") && title.includes("Historia")) {
        modulo = "Word";
        aulaNumero = 1;
    } else if (title.includes("Word") && title.includes("Formatação")) {
        modulo = "Word";
        aulaNumero = 2;
    } else if (title.includes("Word") && title.includes("Inserir")) {
        modulo = "Word";
        aulaNumero = 3;
    } else if (title.includes("Word") && title.includes("Tabelas")) {
        modulo = "Word";
        aulaNumero = 4;
    } else if (title.includes("Word") && title.includes("Títulos")) {
        modulo = "Word";
        aulaNumero = 5;
    } else {
        console.log("Nenhuma condição atendida para o título:", title);
    }
    // Adicionar mais conforme necessário

    console.log("Módulo identificado:", modulo, "Número:", aulaNumero); // Debug

    const btn = document.getElementById('btn-concluir');
    if (btn) {
        btn.addEventListener('click', () => marcarConcluida(modulo, aulaNumero));
    }
}

document.addEventListener('DOMContentLoaded', initAula);