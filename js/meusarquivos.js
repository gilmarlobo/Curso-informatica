// js/meusarquivos.js

// Estado da aplicação
const state = {
    usuarioId: null,
    usuarioNome: null,
    arquivos: [],
    arquivoParaDeletar: null
};

// Elementos do DOM
const uploadArea = document.getElementById('upload-area');
const inputArquivo = document.getElementById('input-arquivo');
const listaArquivos = document.getElementById('lista-arquivos');
const vazio = document.getElementById('vazio');
const mensagemArea = document.getElementById('mensagem-area');
const modal = document.getElementById('modal-confirmacao');
const btnCancelarDelete = document.getElementById('btn-cancelar-delete');
const btnConfirmarDelete = document.getElementById('btn-confirmar-delete');
const nomeArquivoDelete = document.getElementById('nome-arquivo-delete');

// Função para mostrar mensagens
function mostrarMensagem(tipo, texto) {
    mensagemArea.className = `mensagem ${tipo}`;
    mensagemArea.textContent = texto;

    if (tipo === 'sucesso') {
        setTimeout(() => {
            mensagemArea.style.display = 'none';
        }, 5000);
    }
}

// Função para esconder a mensagem
function esconderMensagem() {
    mensagemArea.style.display = 'none';
}

// Carregar usuário
async function carregarUsuario() {
    if (!window._supabase) {
        return false;
    }

    const { data: { session } } = await window._supabase.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
        return false;
    }

    state.usuarioId = session.user.id;

    const { data: perfil } = await window._supabase
        .from('profiles')
        .select('nome')
        .eq('id', state.usuarioId)
        .single();

    state.usuarioNome = perfil?.nome || 'Aluno';
    return true;
}

// Criar tabela se não existir
async function garantirTabelaArquivos() {
    // Nota: Idealmente isso deve ser feito via SQL editor do Supabase
    // Tabela: user_files
    // Colunas: id (uuid), user_id (uuid), nome_arquivo (text), arquivo_path (text), tamanho (integer), data_upload (timestamp), created_at (timestamp)
    console.log('Usando tabela user_files pré-criada no Supabase');
}

// Carregar lista de arquivos
async function carregarArquivos() {
    if (!window._supabase || !state.usuarioId) return;

    try {
        const { data, error } = await window._supabase
            .from('user_files')
            .select('id, nome_arquivo, arquivo_path, tamanho, data_upload, created_at')
            .eq('user_id', state.usuarioId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro ao carregar arquivos:', error);
            mostrarMensagem('erro', 'Erro ao carregar seus arquivos');
            return;
        }

        state.arquivos = data || [];
        renderizarArquivos();
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('erro', 'Erro ao carregar seus arquivos');
    }
}

// Renderizar lista de arquivos
function renderizarArquivos() {
    if (state.arquivos.length === 0) {
        listaArquivos.innerHTML = '';
        vazio.style.display = 'block';
        return;
    }

    vazio.style.display = 'none';
    listaArquivos.innerHTML = state.arquivos.map(arquivo => {
        const dataUpload = new Date(arquivo.data_upload || arquivo.created_at);
        const dataFormatada = dataUpload.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const tamanhoFormatado = formatarTamanho(arquivo.tamanho);

        return `
            <li class="item-arquivo">
                <div class="arquivo-info">
                    <i class="material-icons arquivo-icone">description</i>
                    <div class="arquivo-detalhes">
                        <a class="arquivo-nome" data-path="${arquivo.arquivo_path}" data-nome="${arquivo.nome_arquivo}">
                            ${escaparHtml(arquivo.nome_arquivo)}
                        </a>
                        <div class="arquivo-data">${dataFormatada} • ${tamanhoFormatado}</div>
                    </div>
                </div>
                <div class="arquivo-acoes">
                    <button class="btn-deletar" data-id="${arquivo.id}" data-nome="${arquivo.nome_arquivo}">
                        <i class="material-icons" style="font-size: 18px;">delete</i>
                        Deletar
                    </button>
                </div>
            </li>
        `;
    }).join('');

    // Adicionar listeners para download
    document.querySelectorAll('.arquivo-nome').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            await baixarArquivo(link.dataset.path, link.dataset.nome);
        });
    });

    // Adicionar listeners para deletar
    document.querySelectorAll('.btn-deletar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const nome = btn.dataset.nome;
            mostrarConfirmacaoDeletar(id, nome);
        });
    });
}

// Formatar tamanho do arquivo
function formatarTamanho(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Escapar HTML
function escaparHtml(texto) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return texto.replace(/[&<>"']/g, m => map[m]);
}

// Mostrar modal de confirmação de deletar
function mostrarConfirmacaoDeletar(id, nome) {
    state.arquivoParaDeletar = { id, nome };
    nomeArquivoDelete.textContent = escaparHtml(nome);
    modal.classList.add('ativo');
}

// Esconder modal
function esconderModal() {
    modal.classList.remove('ativo');
    state.arquivoParaDeletar = null;
}

// Deletar arquivo
async function deletarArquivo(id) {
    if (!window._supabase || !state.usuarioId) return;

    try {
        esconderModal();

        // Encontrar arquivo para pegar o path
        const arquivo = state.arquivos.find(a => a.id === id);
        if (!arquivo) {
            mostrarMensagem('erro', 'Arquivo não encontrado');
            return;
        }

        // Deletar do Storage
        const { error: errorStorage } = await window._supabase.storage
            .from('user-files')
            .remove([arquivo.arquivo_path]);

        if (errorStorage) {
            console.error('Erro ao deletar do storage:', errorStorage);
        }

        // Deletar do banco de dados
        const { error } = await window._supabase
            .from('user_files')
            .delete()
            .eq('id', id)
            .eq('user_id', state.usuarioId);

        if (error) {
            mostrarMensagem('erro', 'Erro ao deletar arquivo');
            console.error(error);
            return;
        }

        // Remover da lista local
        state.arquivos = state.arquivos.filter(a => a.id !== id);
        renderizarArquivos();
        mostrarMensagem('sucesso', 'Arquivo deletado com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('erro', 'Erro ao deletar arquivo');
    }
}

// Baixar arquivo
async function baixarArquivo(path, nome) {
    if (!window._supabase) return;

    try {
        // Gerar URL assinada para download (bucket privado)
        const { data, error } = await window._supabase.storage
            .from('user-files')
            .createSignedUrl(path, 60);

        if (error) {
            console.error('Erro ao gerar URL:', error);
            mostrarMensagem('erro', 'Erro ao gerar URL de download');
            return;
        }

        if (data && data.signedUrl) {
            // Criar link temporário para download
            const link = document.createElement('a');
            link.href = data.signedUrl;
            link.download = nome;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            mostrarMensagem('erro', 'Não foi possível gerar URL de download');
        }
    } catch (error) {
        console.error('Erro ao baixar arquivo:', error);
        mostrarMensagem('erro', 'Erro ao baixar arquivo');
    }
}

// Fazer upload de arquivo
async function fazerUpload(arquivos) {
    if (!window._supabase || !state.usuarioId) return;

    // Validar quantidade de arquivos
    if (arquivos.length === 0) {
        return;
    }

    // Validar tamanho máximo (50MB por arquivo)
    const tamanhoMaximo = 50 * 1024 * 1024;
    for (let arquivo of arquivos) {
        if (arquivo.size > tamanhoMaximo) {
            mostrarMensagem('erro', `Arquivo ${arquivo.name} é muito grande (máx 50MB)`);
            return;
        }
    }

    try {
        uploadArea.style.opacity = '0.6';
        uploadArea.style.pointerEvents = 'none';

        let sucessos = 0;

        for (let arquivo of arquivos) {
            // Gerar path único
            const timestamp = Date.now();
            const nomeArquivoSafe = arquivo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const path = `${state.usuarioId}/${timestamp}_${nomeArquivoSafe}`;

            try {
                // Upload para Storage
                const { data, error: errorUpload } = await window._supabase.storage
                    .from('user-files')
                    .upload(path, arquivo);

                if (errorUpload) {
                    console.error(`Erro ao fazer upload de ${arquivo.name}:`, errorUpload);
                    continue;
                }

                // Salvar metadados no banco
                const { error: errorDb } = await window._supabase
                    .from('user_files')
                    .insert({
                        user_id: state.usuarioId,
                        nome_arquivo: arquivo.name,
                        arquivo_path: path,
                        tamanho: arquivo.size,
                        data_upload: new Date().toISOString()
                    });

                if (errorDb) {
                    console.error(`Erro ao salvar metadados de ${arquivo.name}:`, errorDb);
                    continue;
                }

                sucessos++;
            } catch (error) {
                console.error(`Erro ao processar ${arquivo.name}:`, error);
            }
        }

        if (sucessos > 0) {
            mostrarMensagem('sucesso', `${sucessos} arquivo(s) enviado(s) com sucesso!`);
            inputArquivo.value = '';
            await carregarArquivos();
        }

        if (sucessos < arquivos.length) {
            mostrarMensagem('erro', `${arquivos.length - sucessos} arquivo(s) não foram enviados`);
        }
    } catch (error) {
        console.error('Erro durante upload:', error);
        mostrarMensagem('erro', 'Erro ao fazer upload de arquivos');
    } finally {
        uploadArea.style.opacity = '1';
        uploadArea.style.pointerEvents = 'auto';
    }
}

// Event Listeners
uploadArea.addEventListener('click', () => {
    inputArquivo.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const arquivos = Array.from(e.dataTransfer.files);
    fazerUpload(arquivos);
});

inputArquivo.addEventListener('change', (e) => {
    const arquivos = Array.from(e.currentTarget.files);
    fazerUpload(arquivos);
});

btnCancelarDelete.addEventListener('click', esconderModal);

btnConfirmarDelete.addEventListener('click', () => {
    if (state.arquivoParaDeletar) {
        deletarArquivo(state.arquivoParaDeletar.id);
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        esconderModal();
    }
});

// Inicialização
async function init() {
    try {
        const usuarioCarregado = await carregarUsuario();
        if (!usuarioCarregado) return;

        await garantirTabelaArquivos();
        await carregarArquivos();
    } catch (error) {
        console.error('Erro na inicialização:', error);
        mostrarMensagem('erro', 'Erro ao carregar a página');
    }
}

init();
