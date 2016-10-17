'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = fromTextArea;

require('./css/base.css');

require('./css/base16-light.css');

require('./css/codemirror.css');

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/mode/markdown/markdown');

require('./vendor/continuelist');

var _showdown = require('showdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var converter = new _showdown.Converter();

var Editor = function () {
    function Editor(elem) {
        var _this = this;

        _classCallCheck(this, Editor);

        this.wrapper = document.createElement('div');
        this.wrapper.className = 'markdown-editor';

        this.previewButton = document.createElement('a');
        this.previewButton.className = 'markdown-editor-preview-toggle';
        this.previewButton.innerText = this.previewButton.textContent = 'Toggle Preview';
        this.previewButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            _this.wrapper.classList.toggle('previewing');
        });
        this.wrapper.appendChild(this.previewButton);

        this.preview = document.createElement('div');
        this.preview.className = 'markdown-editor-preview';
        this.wrapper.appendChild(this.preview);

        this.elem = elem;
        this.elem.parentNode.replaceChild(this.wrapper, this.elem);
        this.wrapper.appendChild(this.elem);

        this.editor = _codemirror2.default.fromTextArea(elem, {
            mode: 'markdown',
            lineNumbers: false,
            matchBrackets: true,
            lineWrapping: true,
            theme: 'base16-light',
            extraKeys: { Enter: 'newlineAndIndentContinueMarkdownList' }
        });

        this.editor.on('change', function (e) {
            return _this.update(e.getValue());
        });
        this.update(this.elem.value);
    }

    _createClass(Editor, [{
        key: 'update',
        value: function update(markdown) {
            this.preview.innerHTML = converter.makeHtml(markdown);
        }
    }]);

    return Editor;
}();

function fromTextArea(textarea) {
    return new Editor(textarea);
};
//# sourceMappingURL=Editor.js.map