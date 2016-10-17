"use strict";

var _codemirror = require("codemirror");

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listRE = /^(\s*)(>[> ]*|[*+-]\s|(\d+)\.)(\s*)/,
    emptyListRE = /^(\s*)(>[> ]*|[*+-]|(\d+)\.)(\s*)$/,
    unorderedListRE = /[*+-]\s/; // CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

_codemirror2.default.commands.newlineAndIndentContinueMarkdownList = function (cm) {
  if (cm.getOption("disableInput")) return _codemirror2.default.Pass;
  var ranges = cm.listSelections(),
      replacements = [];
  for (var i = 0; i < ranges.length; i++) {
    var pos = ranges[i].head;
    var eolState = cm.getStateAfter(pos.line);
    var inList = eolState.list !== false;
    var inQuote = eolState.quote !== 0;

    var line = cm.getLine(pos.line),
        match = listRE.exec(line);
    if (!ranges[i].empty() || !inList && !inQuote || !match) {
      cm.execCommand("newlineAndIndent");
      return;
    }
    if (emptyListRE.test(line)) {
      cm.replaceRange("", {
        line: pos.line, ch: 0
      }, {
        line: pos.line, ch: pos.ch + 1
      });
      replacements[i] = "\n";
    } else {
      var indent = match[1],
          after = match[4];
      var bullet = unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0 ? match[2] : parseInt(match[3], 10) + 1 + ".";

      replacements[i] = "\n" + indent + bullet + after;
    }
  }

  cm.replaceSelections(replacements);
};
//# sourceMappingURL=continuelist.js.map