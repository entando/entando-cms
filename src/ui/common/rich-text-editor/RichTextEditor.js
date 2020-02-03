import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill-2';
import 'react-quill-2/dist/quill.snow.css';

import EditorToolbar from 'ui/common/rich-text-editor/EditorToolbar';
import LinkConfigModal from 'ui/common/modal/LinkConfigModal';
import SpecialCharSelectorModal from 'ui/common/rich-text-editor/SpecialCharSelectorModal';

const BlockEmbed = Quill.import('blots/block/embed');

function DividerBlot(...args) {
  return Reflect.construct(BlockEmbed, args, DividerBlot);
}
Object.setPrototypeOf(DividerBlot.prototype, BlockEmbed.prototype);
Object.setPrototypeOf(DividerBlot, BlockEmbed);
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

Quill.register(DividerBlot);

const txtArea = document.createElement('textarea');
txtArea.classList.add('html-editor');
txtArea.style.display = 'none';

function history(value) {
  if (value === 'undo') {
    this.quill.history.undo();
  } else {
    this.quill.history.redo();
  }
}

function divider() {
  const range = this.quill.getSelection();
  if (range) {
    this.quill.insertEmbed(range.index, 'divider', 'null');
  }
}

function maximize() {
  const blockElementClass = 'RenderRichTextEditor__content';
  const editorContainer = document.querySelector(`.${blockElementClass}`);
  editorContainer.classList.toggle(`${blockElementClass}--maximize`);
  document.body.classList.toggle('no-scroll');
}

function viewSource() {
  if (txtArea.style.display === '') {
    const html = txtArea.value;
    this.quill.clipboard.dangerouslyPasteHTML(html);
  }
  txtArea.style.display = txtArea.style.display === 'none' ? '' : 'none';
}

function entable(value) {
  const table = this.quill.getModule('table');
  const rows = 2;
  const cols = 2;
  switch (value) {
    case 'table':
      table.insertTable(rows, cols);
      break;
    case 'table-insert-row':
      table.insertRow();
      break;
    case 'table-insert-column':
      table.insertColumn();
      break;
    case 'table-delete-row':
      table.deleteRow();
      break;
    case 'table-delete-column':
      table.deleteColumn();
      break;
    case 'table-delete':
      table.deleteTable();
      break;
    default:
  }
}

class RichTextEditor extends Component {
  constructor() {
    super();

    this.state = {
      modal: '',
    };
    this.reactQuill = createRef();
    this.quill = null;

    this.modules = {
      toolbar: {
        container: '#editor-toolbar',
        handlers: {
          enlink: this.enlinkHandler.bind(this),
          entable,
          divider,
          specialChar: this.specialCharHandler.bind(this),
          history,
          maximize,
          viewSource,
        },
      },
      table: true,
    };

    this.formats = [
      'bold',
      'italic',
      'strike',
      'clean',
      'list',
      'indent',
      'blockquote',
      'link',
      'table',
    ];

    this.handleLinkConfigSave = this.handleLinkConfigSave.bind(this);
    this.handleInsertSpecialChar = this.handleInsertSpecialChar.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();

    const htmlEditor = this.quill.addContainer('ql-custom');
    htmlEditor.appendChild(txtArea);

    const myEditor = document.querySelector('.ql-editor');
    this.quill.on('text-change', () => {
      const html = myEditor.innerHTML;
      txtArea.value = html;
    });
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs() {
    if (typeof this.reactQuill.current.getEditor !== 'function') return;
    this.quill = this.reactQuill.current.getEditor();
    const { input: { name } } = this.props;
    this.quill.id = name;
  }

  handleLinkConfigSave(values) {
    this.handleModalClose();
    const { url } = values;
    this.quill.format('link', url);
  }

  handleInsertSpecialChar(char) {
    this.handleModalClose();
    const cursor = this.quill.getSelection().index;
    this.quill.insertText(cursor, char);

    // circumvents inconsistent selection updates
    setTimeout(() => {
      this.quill.focus();
      this.quill.setSelection(cursor + 1);
    }, 0);
  }

  handleModalClose() {
    this.setState({
      modal: '',
    });
  }

  enlinkHandler(value) {
    const selection = this.quill.getSelection();
    if (value === 'link' && selection.length >= 1) {
      this.setState({
        modal: 'enlink',
      });
    } else {
      this.quill.format('link', false);
    }
  }

  specialCharHandler() {
    this.setState({
      modal: 'specialChar',
    });
  }

  render() {
    const {
      placeholder, disabled, input,
    } = this.props;

    const { modal } = this.state;

    return (
      <div>
        <EditorToolbar />
        <ReactQuill
          {...input}
          ref={this.reactQuill}
          onBlur={(_, __, editor) => input.onBlur(editor.getHTML())}
          placeholder={placeholder}
          disabled={disabled}
          modules={this.modules}
          formats={this.formats}
        />
        <LinkConfigModal
          isVisible={modal === 'enlink'}
          hasResourceTab
          onSave={this.handleLinkConfigSave}
          onClose={this.handleModalClose}
        />
        <SpecialCharSelectorModal
          isVisible={modal === 'specialChar'}
          onSelect={this.handleInsertSpecialChar}
          onClose={this.handleModalClose}
        />
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
  }).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

RichTextEditor.defaultProps = {
  placeholder: '',
  disabled: false,
};

export default RichTextEditor;
