import './css/base.css';
import './css/base16-light.css';
import './css/codemirror.css';

import cm from 'codemirror';
import 'codemirror/mode/gfm/gfm';
import './vendor/continuelist';

import markdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';

const renderer = markdownIt().use(markdownItFootnote);


class Editor {
    constructor(elem) {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'markdown-editor';

        this.previewButton = document.createElement('a');
        this.previewButton.className = 'markdown-editor-preview-toggle';
        this.previewButton.innerText = this.previewButton.textContent = 'Toggle Preview';
        this.previewButton.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            this.wrapper.classList.toggle('previewing');
        });
        this.wrapper.appendChild(this.previewButton);

        this.preview = document.createElement('div');
        this.preview.className = 'markdown-editor-preview';
        this.wrapper.appendChild(this.preview);

        this.elem = elem;
        this.elem.parentNode.replaceChild(this.wrapper, this.elem);
        this.wrapper.appendChild(this.elem);

        this.editor = cm.fromTextArea(elem, {
            mode: 'gfm',
            lineNumbers: false,
            matchBrackets: true,
            lineWrapping: true,
            theme: 'base16-light',
            extraKeys: {Enter: 'newlineAndIndentContinueMarkdownList'},
        });

        this.editor.on('change', e => this.update(e.getValue()));
        this.update(this.elem.value);
    }

    update(markdown) {
        this.preview.innerHTML = renderer.render(markdown);
    }
}


export default function fromTextArea(textarea) {
    return new Editor(textarea);
};
