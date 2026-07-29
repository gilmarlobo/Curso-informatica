(function () {
    const proximasAulas = {
        'aula01.html': 'aula02.html',
        'aula02.html': 'aula03.html',
        'aula03.html': 'aula04.html',
        'aula04.html': 'aula05_extensoes_profundas.html',
        'aula05_extensoes_profundas.html': 'aula09_tamanho_arquivos.html',
        'aula09_tamanho_arquivos.html': 'aula05_so.html',
        'aula05_so.html': 'aula06_so_pastas.html',
        'aula06_so_pastas.html': 'aula07_so_aplicativos.html',
        'aula07_so_aplicativos.html': 'aula04_so_configuracoes_importantes.html',
        'aula04_so_configuracoes_importantes.html': 'aula01_word.html',
        'aula01_word.html': 'aula02_word_formatacao_basica.html',
        'aula02_word_formatacao_basica.html': 'aula03_word_formas_imagens.html',
        'aula03_word_formas_imagens.html': 'aula02_word.html',
        'aula02_word.html': 'aula08_word_titulos.html',
        'aula08_word_titulos.html': 'aula01_powerpoint.html',
        'aula01_powerpoint.html': 'aula02_powerpoint.html',
        'aula02_powerpoint.html': 'aula03_powerpoint.html',
        'aula03_powerpoint.html': 'aula04_powerpoint.html',
        'aula04_powerpoint.html': 'aula05_powerpoint.html',
        'aula05_powerpoint.html': 'aula06_powerpoint.html',
        'aula06_powerpoint.html': 'aula07_powerpoint.html',
        'aula07_powerpoint.html': 'aula01_excel.html',
        'aula01_excel.html': 'aula02_excel.html',
        'aula02_excel.html': 'aula03_excel.html',
        'aula03_excel.html': 'aula04_excel.html',
        'aula04_excel.html': 'aula05_excel.html',
        'aula05_excel.html': 'aula06_excel.html',
        'aula06_excel.html': null
    };

    function getCurrentLessonFile() {
        const path = window.location.pathname || '';
        return path.split('/').pop() || '';
    }

    function injectNextButton() {
        const currentFile = getCurrentLessonFile();
        const nextFile = proximasAulas[currentFile];
        const header = document.querySelector('.aula-header');

        if (!header || !nextFile) return;

        if (header.querySelector('.aula-nav-actions')) return;

        const actions = document.createElement('div');
        actions.className = 'aula-nav-actions';

        const nextLink = document.createElement('a');
        nextLink.href = nextFile;
        nextLink.className = 'btn-proxima';
        nextLink.textContent = 'Próxima aula →';

        actions.appendChild(nextLink);

        const voltarBtn = header.querySelector('.btn-voltar');
        if (voltarBtn) {
            voltarBtn.insertAdjacentElement('afterend', actions);
        } else {
            header.prepend(actions);
        }
    }

    document.addEventListener('DOMContentLoaded', injectNextButton);
})();
