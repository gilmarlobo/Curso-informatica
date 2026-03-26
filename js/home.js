const state = {
    modulos: [],
    moduloAtual: "",
    progresso: new Map() // Map<modulo-aula_numero, concluida>
};

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

async function carregarUsuario() {
    if (!window._supabase) {
        return;
    }

    const { data: { session } } = await window._supabase.auth.getSession();
    if (!session) {
        window.location.href = "index.html";
        return;
    }

    const { data: perfil } = await window._supabase
        .from("profiles")
        .select("nome")
        .eq("id", session.user.id)
        .single();

    document.getElementById("user-name").innerText = perfil?.nome || "Aluno";
}

async function carregarCatalogo() {
    const response = await fetch("data/aulas.json", { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Nao foi possivel carregar data/aulas.json");
    }
    const data = await response.json();
    state.modulos = Array.isArray(data.modulos) ? data.modulos : [];
}

async function carregarProgresso() {
    if (!window._supabase) return;

    const { data: { session } } = await window._supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await window._supabase
        .from('progresso_aulas')
        .select('modulo, aula_numero, concluida')
        .eq('user_id', session.user.id);

    if (error) {
        console.error('Erro ao carregar progresso:', error);
        return;
    }

    state.progresso.clear();
    data.forEach(item => {
        const key = `${item.modulo}-${item.aula_numero}`;
        state.progresso.set(key, item.concluida);
    });

    // Calcular e mostrar progresso geral
    calcularProgressoGeral();
}

function renderizarBotoes() {
    const nav = document.getElementById("modulo-nav");
    nav.innerHTML = "";

    state.modulos.forEach((modulo, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.innerText = modulo.nome;
        button.addEventListener("click", () => filtrarAulas(modulo.nome));

        if (index === 0) {
            state.moduloAtual = modulo.nome;
        }

        nav.appendChild(button);
    });
}

function renderizarCards(aulas, moduloSelecionado) {
    const titulo = document.getElementById("modulo-titulo");
    const container = document.getElementById("lista-aulas");
    titulo.innerText = `Modulo: ${moduloSelecionado}`;

    if (!Array.isArray(aulas) || aulas.length === 0) {
        container.innerHTML = `<p class="empty-state">Nenhuma aula de ${escapeHtml(moduloSelecionado)} liberada ainda.</p>`;
        return;
    }

    const cards = aulas.map((aula) => {
        const numero = escapeHtml(aula.numero ?? "");
        const tituloAula = escapeHtml(aula.titulo ?? "Sem titulo");
        const descricao = escapeHtml(aula.descricao ?? "");
        const link = escapeHtml(aula.link ?? "#");
        const alvo = aula.externo ? ' target="_blank" rel="noopener noreferrer"' : "";

        const key = `${moduloSelecionado}-${numero}`;
        const concluida = state.progresso.get(key);
        const classeConcluida = concluida ? ' aula-concluida' : '';
        const textoConcluida = concluida ? '<div class="status-concluida">Aula concluída</div>' : '';

        return `
            <article class="aula-card${classeConcluida}">
                <div class="aula-badge">Aula ${numero}</div>
                <h3>${tituloAula}</h3>
                <p>${descricao}</p>
                ${textoConcluida}
                <a href="${link}" class="btn-acessar"${alvo}>Acessar aula</a>
            </article>
        `;
    }).join("");

    const campanhaCard = `
        <article class="aula-card campanha-card">
            <div class="aula-badge">Campanha</div>
            <h3>Campanha Páscoa Solidária</h3>
            <p>Faça a sua doação de alimentos não perecíveis e ajude famílias carentes da nossa cidade.</p>
            <div class="campanha-img-wrapper">
                <img src="img/pascoa.jpeg" alt="Campanha interna" class="campanha-img" />
            </div>
        </article>
    `;

    container.innerHTML = cards + campanhaCard;
}

function filtrarAulas(moduloSelecionado) {
    state.moduloAtual = moduloSelecionado;
    document.querySelectorAll("#modulo-nav button").forEach((button) => {
        button.classList.toggle("active", button.innerText === moduloSelecionado);
    });
    const modulo = state.modulos.find((item) => item.nome === moduloSelecionado);

    // Verificar se é um módulo especial
    if (modulo?.especial && modulo?.link) {
        window.location.href = modulo.link;
        return;
    }

    renderizarCards(modulo?.aulas || [], moduloSelecionado);
}

function calcularProgressoGeral() {
    let totalAulas = 0;
    let aulasConcluidas = 0;

    state.modulos.forEach(modulo => {
        if (modulo.aulas && Array.isArray(modulo.aulas)) {
            modulo.aulas.forEach(aula => {
                totalAulas++;
                const key = `${modulo.nome}-${aula.numero}`;
                if (state.progresso.get(key)) {
                    aulasConcluidas++;
                }
            });
        }
    });

    const porcentagem = totalAulas > 0 ? Math.round((aulasConcluidas / totalAulas) * 100) : 0;

    // Mostrar no header
    const progressoElement = document.getElementById('progresso-geral');
    if (progressoElement) {
        progressoElement.innerText = `Progresso: ${aulasConcluidas}/${totalAulas} aulas (${porcentagem}%)`;
    }
}

async function deslogar() {
    if (window._supabase) {
        await window._supabase.auth.signOut();
    }
    window.location.href = "index.html";
}

async function init() {
    try {
        await carregarUsuario();
        await carregarCatalogo();
        await carregarProgresso();
        renderizarBotoes();

        if (state.moduloAtual) {
            filtrarAulas(state.moduloAtual);
        } else {
            document.getElementById("lista-aulas").innerHTML = '<p class="empty-state">Nenhum modulo configurado no JSON.</p>';
        }
    } catch (error) {
        document.getElementById("lista-aulas").innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
    }
}

const btnSair = document.getElementById("btn-sair");
if (btnSair) {
    btnSair.addEventListener("click", deslogar);
}
init();
