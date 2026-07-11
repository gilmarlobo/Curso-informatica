(function () {
    const replacements = [
        { from: 'ÃƒÂ¡', to: 'á' },
        { from: 'Ã¡', to: 'á' },
        { from: 'ÃƒÂ¢', to: 'â' },
        { from: 'Ã¢', to: 'â' },
        { from: 'ÃƒÂ£', to: 'ã' },
        { from: 'Ã£', to: 'ã' },
        { from: 'ÃƒÂ§', to: 'ç' },
        { from: 'Ã§', to: 'ç' },
        { from: 'ÃƒÂ©', to: 'é' },
        { from: 'Ã©', to: 'é' },
        { from: 'ÃƒÂª', to: 'ê' },
        { from: 'Ãª', to: 'ê' },
        { from: 'ÃƒÂ­', to: 'í' },
        { from: 'Ã­', to: 'í' },
        { from: 'ÃƒÂ³', to: 'ó' },
        { from: 'Ã³', to: 'ó' },
        { from: 'ÃƒÂ´', to: 'ô' },
        { from: 'Ã´', to: 'ô' },
        { from: 'ÃƒÂµ', to: 'õ' },
        { from: 'Ãµ', to: 'õ' },
        { from: 'ÃƒÂº', to: 'ú' },
        { from: 'Ãº', to: 'ú' },
        { from: 'ÃƒÂ¼', to: 'ü' },
        { from: 'Ã¼', to: 'ü' },
        { from: 'ÃƒÂ€', to: '€' },
        { from: 'Â°', to: '°' },
        { from: 'Âº', to: 'º' },
        { from: 'Âª', to: 'ª' },
        { from: 'Â', to: '' },
        { from: 'â€™', to: '’' },
        { from: 'â€œ', to: '“' },
        { from: 'â€', to: '”' },
        { from: 'â€“', to: '–' },
        { from: 'â€”', to: '—' },
        { from: 'â€¦', to: '…' },
        { from: 'â€', to: '"' },
        { from: 'â‚¬', to: '€' },
        { from: 'â€¢', to: '•' },
        { from: 'Ã„', to: 'Ä' },
        { from: 'Ã…', to: 'Å' },
        { from: 'Ã¶', to: 'ö' },
        { from: 'Ã–', to: 'Ö' },
        { from: 'Ãœ', to: 'Ü' },
        { from: 'Ã‰', to: 'É' },
        { from: 'Ãˆ', to: 'È' },
        { from: 'ÃŠ', to: 'Ê' },
        { from: 'Ã‹', to: 'Ë' },
        { from: 'Ã†', to: 'Ç' },
        { from: 'Ãƒ', to: 'Ã' },
        { from: 'â', to: '' }
    ];

    function fixText(value) {
        if (typeof value !== 'string' || !value) return value;
        let result = value;
        replacements.forEach(({ from, to }) => {
            result = result.split(from).join(to);
        });
        return result;
    }

    function walkAndFix(node) {
        if (!node) return;

        if (node.nodeType === Node.TEXT_NODE) {
            const fixed = fixText(node.textContent || '');
            if (fixed !== node.textContent) {
                node.textContent = fixed;
            }
            return;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const attrs = ['title', 'alt', 'placeholder', 'aria-label', 'aria-labelledby'];
            attrs.forEach((attr) => {
                const value = node.getAttribute(attr);
                if (value) {
                    const fixed = fixText(value);
                    if (fixed !== value) {
                        node.setAttribute(attr, fixed);
                    }
                }
            });

            if (node.tagName === 'TITLE') {
                const fixed = fixText(document.title);
                if (fixed !== document.title) {
                    document.title = fixed;
                }
            }

            const childNodes = Array.from(node.childNodes);
            childNodes.forEach(walkAndFix);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        walkAndFix(document.body);
        document.title = fixText(document.title);
    });
})();
