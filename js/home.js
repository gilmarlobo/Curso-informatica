const state = {
    modulos: [],
    moduloAtual: "",
    progresso: new Map() // Map<modulo-aula_numero, concluida>
};

const monkeyTypeRanking = [
    { pos: 1, nome: 'Lúcio', wpm: 50, turma: 'Turma B', avatar: 'https://i.pravatar.cc/80?img=12' },
    { pos: 2, nome: 'Ana Gabriely', wpm: 33, turma: 'Turma B', avatar: 'https://i.pravatar.cc/80?img=32' },
    { pos: 3, nome: 'Jecivane', wpm: 31, turma: 'Turma A', avatar: 'https://i.pravatar.cc/80?img=8' },
    { pos: 4, nome: 'Thamyres', wpm: 29, turma: 'Turma C', avatar: 'https://i.pravatar.cc/80?img=48' },
    { pos: 5, nome: 'Ana Beatriz', wpm: 28, turma: 'Turma A', avatar: 'https://i.pravatar.cc/80?img=10' }
];

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

async function carregarPontos() {
    if (!window._supabase) return;

    const { data: { session } } = await window._supabase.auth.getSession();
    if (!session) return;

    const { data: perfil } = await window._supabase
        .from("profiles")
        .select("pontos")
        .eq("id", session.user.id)
        .single();

    const pontosElement = document.getElementById("user-points");
    if (pontosElement) {
        pontosElement.innerText = perfil?.pontos || 0;
    }
}

// Função global para atualizar pontos (pode ser chamada de outras páginas)
window.atualizarPontos = carregarPontos;

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
        <article class="aula-card campanha-card" onclick="openMonkeyTypeRankingModal()" style="cursor:pointer;">
            <div class="aula-badge">Ranking</div>
            <h3>Ranking MonkeyType</h3>
            <p>Veja os 5 primeiros colocados no desafio de digitação por velocidade (WPM) do mês de março/2026.</p>
            <div class="campanha-img-wrapper">
                <img src="img/podio_digitacao.png" alt="MonkeyType" class="campanha-img" />
            </div>
            <a href="#" class="btn-acessar" onclick="event.preventDefault(); openMonkeyTypeRankingModal();">Ver Podium</a>
        </article>
    `;

    container.innerHTML = cards + campanhaCard;
}

function formatarWPM(value) {
    return `${value} WPM`;
}

function refreshMonkeyTypeRanking() {
    const lista = document.getElementById('monkeytype-ranking-list');
    const firstName = document.getElementById('podium-first-name');
    const firstValue = document.getElementById('podium-first-value');
    const secondName = document.getElementById('podium-second-name');
    const secondValue = document.getElementById('podium-second-value');
    const thirdName = document.getElementById('podium-third-name');
    const thirdValue = document.getElementById('podium-third-value');
    const firstAvatar = document.getElementById('podium-first-avatar');
    const secondAvatar = document.getElementById('podium-second-avatar');
    const thirdAvatar = document.getElementById('podium-third-avatar');

    const rankingGlobal = monkeyTypeRanking
        .sort((a, b) => b.wpm - a.wpm)
        .slice(0, 5);

    const [top1, top2, top3] = rankingGlobal;

    firstName.textContent = top1 ? top1.nome : '-';
    firstValue.textContent = top1 ? formatarWPM(top1.wpm) : '0 WPM';
    firstAvatar.src = 'img/medalha_ouro.png';

    secondName.textContent = top2 ? top2.nome : '-';
    secondValue.textContent = top2 ? formatarWPM(top2.wpm) : '0 WPM';
    secondAvatar.src = 'img/medalha_prata.png';

    thirdName.textContent = top3 ? top3.nome : '-';
    thirdValue.textContent = top3 ? formatarWPM(top3.wpm) : '0 WPM';
    thirdAvatar.src = 'img/medalha_bronze.png';

    lista.innerHTML = rankingGlobal.map((jogador, index) =>
        `<li class="ranking-item ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}">
            <span>${index + 1}º</span>
            <strong>${jogador.nome} (${jogador.turma})</strong>
            <small>${formatarWPM(jogador.wpm)}</small>
        </li>`
    ).join('');
}

function openMonkeyTypeRankingModal() {
    refreshMonkeyTypeRanking();

    const modal = document.getElementById('monkeytype-ranking-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeMonkeyTypeRankingModal() {
    const modal = document.getElementById('monkeytype-ranking-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
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
        await carregarPontos(); // Atualizar pontos após progresso
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

const modalOverlay = document.getElementById('monkeytype-ranking-modal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeMonkeyTypeRankingModal();
        }
    });
}

init();
