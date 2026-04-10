/**
 * Sistema de Quiz para Aulas - quiz.js
 * Gerencia quizzes de verificação de aprendizado para cada aula
 */

// Dados dos quizzes por aula
const quizDatabase = {
    'Fundamentos da Informatica': {
        1: { // Aula 01 - ENIAC
            pergunta: 'Qual era a principal função do ENIAC?',
            opcoes: [
                'Calcular trajetórias de projéteis e tabelas balísticas',
                'Armazenar documentos de texto em massa',
                'Controlar redes de computadores',
                'Realizar desenhos gráficos digitais'
            ],
            indiceCorreto: 0
        },
        2: { // Aula 02 - Tipos de computadores
            pergunta: 'Qual dos seguintes NÃO é considerado um tipo de computador pessoal?',
            opcoes: [
                'Desktop',
                'Notebook',
                'Servidor de rede',
                'Tablet'
            ],
            indiceCorreto: 2
        },
        3: { // Aula 03 - Hardware e Software
            pergunta: 'O que é considerado hardware em um computador?',
            opcoes: [
                'Sistema operacional Windows',
                'Processador e memória RAM',
                'Programa Microsoft Word',
                'Navegador Google Chrome'
            ],
            indiceCorreto: 1
        },
        4: { // Aula 04 - Metadados
            pergunta: 'O que são metadados de um arquivo?',
            opcoes: [
                'O conteúdo visível do arquivo',
                'Informações sobre o arquivo (data, tamanho, autor)',
                'A extensão do arquivo',
                'O programa que criou o arquivo'
            ],
            indiceCorreto: 1
        },
        5: { // Aula 05 - Extensões
            pergunta: 'Qual extensão está condinzente com o nome do arquivos de imagem?',
            opcoes: [
                'imagem.txt',
                'foto.docx',
                'figura.exe',
                'foto.jpg'
            ],
            indiceCorreto: 3
        },
        6: { // Aula 06 - Tamanho de arquivos
            pergunta: 'Qual unidade representa a menor quantidade de dados digitais?',
            opcoes: [
                'Byte',
                'Bit',
                'Kilobyte',
                'Megabyte'
            ],
            indiceCorreto: 1
        }
    },
    'Sistema Operacional': {
        1: { // Aula SO 01
            pergunta: 'Qual é a função principal de um Sistema Operacional?',
            opcoes: [
                'Executar jogos',
                'Gerenciar recursos do hardware e software',
                'Criar documentos',
                'Navegar na internet'
            ],
            indiceCorreto: 1
        },
        2: { // Aula SO 02 - Pastas e Diretórios
            pergunta: 'O que são pastas (ou diretórios) em um computador?',
            opcoes: [
                'Contêineres para organizar arquivos',
                'Programas do sistema',
                'Dispositivos de armazenamento',
                'Arquivos de texto'
            ],
            indiceCorreto: 0
        },
        3: { // Aula SO 03 - Aplicativos
            pergunta: 'Qual é a diferença entre software e aplicativo?',
            opcoes: [
                'Não há diferença',
                'Software é mais amplo, aplicativo é específico',
                'Aplicativo é mais amplo, software é específico',
                'São sinônimos'
            ],
            indiceCorreto: 1
        }
    },
    'Word': {
        1: { // Aula Word 01
            pergunta: 'Qual é a extensão padrão dos arquivos criados no Microsoft Word?',
            opcoes: [
                '.txt',
                '.png',
                '.docx',
                '.xls'
            ],
            indiceCorreto: 2
        },
        2: { // Aula Word 02 - Formatação
            pergunta: 'Qual ferramenta do Word permite alterar o tamanho da fonte?',
            opcoes: [
                'Tamanho da Fonte',
                'Alinhamento',
                'Parágrafo',
                'Página'
            ],
            indiceCorreto: 0
        },
        3: { // Aula Word 03 - Inserir
            pergunta: 'Qual opção permite inserir imagens em um documento Word?',
            opcoes: [
                'Página Inicial',
                'Layout',
                'Inserir',
                'Referências'
            ],
            indiceCorreto: 2
        },
        4: { // Aula Word 04 - Tabelas
            pergunta: 'Para que servem as tabelas em documentos Word?',
            opcoes: [
                'Apenas decoração',
                'Criar gráficos',
                'Organizar dados em linhas e colunas',
                'Formatar texto'
            ],
            indiceCorreto: 2
        },
        5: { // Aula Word 05 - Títulos
            pergunta: 'O que são títulos e subtítulos em um documento?',
            opcoes: [
                'Nomes de arquivos',
                'Estrutura hierárquica do conteúdo',
                'Notas de rodapé',
                'Cabeçalhos de página'
            ],
            indiceCorreto: 1
        }
    }
};

/**
 * Classe principal do sistema de quiz
 */
class QuizSystem {
    constructor(modulo, aulaNumero) {
        this.modulo = modulo;
        this.aulaNumero = aulaNumero;
        this.quizData = quizDatabase[modulo]?.[aulaNumero];
        this.selectedIndex = null;
        this.modal = null;
        this.elements = {};
        this.init();
    }

    /**
     * Inicializa o sistema de quiz
     */
    init() {
        if (!this.quizData) {
            console.error(`Quiz não encontrado para ${this.modulo} - Aula ${this.aulaNumero}`);
            return;
        }

        this.setupElements();
        this.setupEventListeners();
        this.checkAulaStatus();
    }

    /**
     * Configura referências aos elementos DOM
     */
    setupElements() {
        this.elements = {
            modal: document.getElementById('quiz-modal'),
            question: document.getElementById('quiz-question'),
            options: document.getElementById('quiz-options'),
            feedback: document.getElementById('quiz-feedback'),
            submitBtn: document.getElementById('quiz-submit'),
            closeBtn: document.getElementById('quiz-close'),
            concluirBtn: document.getElementById('btn-concluir')
        };
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        const { submitBtn, closeBtn, modal, concluirBtn } = this.elements;

        if (submitBtn) submitBtn.addEventListener('click', () => this.submitAnswer());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) this.closeModal();
            });
        }
        if (concluirBtn) {
            const newBtn = concluirBtn.cloneNode(true);
            concluirBtn.parentNode.replaceChild(newBtn, concluirBtn);
            newBtn.addEventListener('click', () => this.openModal());
            this.elements.concluirBtn = newBtn;
        }
    }

    /**
     * Verifica se aula já foi concluída pelo usuário atual
     */
    async checkAulaStatus() {
        const isCompleted = await this.isAulaCompleted();
        const { concluirBtn } = this.elements;

        if (isCompleted && concluirBtn) {
            concluirBtn.innerText = 'Aula Concluída';
            concluirBtn.style.backgroundColor = '#28a745';
            concluirBtn.disabled = true;
        }
    }

    /**
     * Verifica no banco se aula foi concluída
     */
    async isAulaCompleted() {
        if (!window._supabase) return false;

        try {
            const { data: { session } } = await window._supabase.auth.getSession();
            if (!session) return false;

            const { data, error } = await window._supabase
                .from('progresso_aulas')
                .select('concluida')
                .eq('user_id', session.user.id)
                .eq('modulo', this.modulo)
                .eq('aula_numero', this.aulaNumero)
                .single();

            return !error && data?.concluida === true;
        } catch (error) {
            console.error('Erro ao verificar status da aula:', error);
            return false;
        }
    }

    /**
     * Abre modal do quiz
     */
    openModal() {
        const { modal, question, options, feedback, submitBtn } = this.elements;

        if (!modal) return;

        // Reset modal state
        question.textContent = this.quizData.pergunta;
        feedback.textContent = '';
        this.selectedIndex = null;
        submitBtn.disabled = true;

        // Clear and populate options
        options.innerHTML = '';
        this.quizData.opcoes.forEach((opcao, index) => {
            options.appendChild(this.createOptionButton(opcao, index));
        });

        modal.classList.add('open');
    }

    /**
     * Fecha modal do quiz
     */
    closeModal() {
        const { modal } = this.elements;
        if (modal) modal.classList.remove('open');
    }

    /**
     * Cria botão de opção
     */
    createOptionButton(text, index) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'quiz-option';
        button.innerText = text;
        button.dataset.index = String(index);
        button.addEventListener('click', () => this.selectOption(index));
        return button;
    }

    /**
     * Seleciona uma opção
     */
    selectOption(index) {
        this.selectedIndex = index;
        const { feedback, submitBtn, options } = this.elements;

        feedback.textContent = '';
        submitBtn.disabled = false;

        // Update visual selection
        Array.from(options.children).forEach((child) => {
            child.classList.toggle('selected', Number(child.dataset.index) === index);
        });
    }

    /**
     * Submete resposta do quiz
     */
    async submitAnswer() {
        if (this.selectedIndex === null) return;

        const { feedback, submitBtn, closeBtn, concluirBtn } = this.elements;

        if (this.selectedIndex !== this.quizData.indiceCorreto) {
            // Close modal immediately and show alert
            this.closeModal();
            alert('Resposta errada. Leia novamente e tente responder de novo.');
            return;
        }

        // Correct answer
        submitBtn.disabled = true;
        closeBtn.disabled = true;
        feedback.style.color = '#198754';
        feedback.textContent = 'Resposta correta! Salvando conclusão e pontuação...';

        try {
            await this.awardPoint();
            await this.markAulaCompleted();

            feedback.textContent = 'Parabéns! Aula concluída e +1 ponto registrado.';

            if (concluirBtn) {
                concluirBtn.innerText = 'Aula Concluída';
                concluirBtn.style.backgroundColor = '#28a745';
                concluirBtn.disabled = true;
            }

            setTimeout(() => this.closeModal(), 2000);
        } catch (error) {
            console.error('Erro ao processar conclusão:', error);
            feedback.style.color = '#dc3545';
            feedback.textContent = 'Erro ao salvar progresso. Tente novamente.';
            submitBtn.disabled = false;
            closeBtn.disabled = false;
        }
    }

    /**
     * Concede ponto ao usuário (apenas uma vez por aula)
     */
    async awardPoint() {
        if (!window._supabase) return;

        const { data: { session } } = await window._supabase.auth.getSession();
        if (!session) return;

        // Check if already awarded for this lesson
        if (await this.isAulaCompleted()) return;

        const { data: profile, error } = await window._supabase
            .from('profiles')
            .select('pontos')
            .eq('id', session.user.id)
            .single();

        if (error || !profile) return;

        const currentPoints = Number(profile.pontos || 0);
        await window._supabase
            .from('profiles')
            .update({ pontos: currentPoints + 1 })
            .eq('id', session.user.id);
    }

    /**
     * Marca aula como concluída
     */
    async markAulaCompleted() {
        if (!window._supabase) return;

        const { data: { session } } = await window._supabase.auth.getSession();
        if (!session) return;

        await window._supabase
            .from('progresso_aulas')
            .upsert({
                user_id: session.user.id,
                modulo: this.modulo,
                aula_numero: this.aulaNumero,
                concluida: true,
                data_conclusao: new Date().toISOString()
            }, { onConflict: 'user_id,modulo,aula_numero' });
    }
}

// Função global para inicializar quiz em qualquer aula
function initQuizForAula(modulo, aulaNumero) {
    if (typeof window !== 'undefined') {
        window.quizSystem = new QuizSystem(modulo, aulaNumero);
    }
}