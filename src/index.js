import Editor from './Editor';

const elems = document.querySelectorAll('textarea.markdown-editor');
Array.from(elems).forEach(el => {
  const e = new Editor(el);
  e.update(el.value);
});
