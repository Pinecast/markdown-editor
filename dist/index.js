'use strict';

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elems = document.querySelectorAll('textarea.markdown-editor');
Array.from(elems).forEach(_Editor2.default);
//# sourceMappingURL=index.js.map