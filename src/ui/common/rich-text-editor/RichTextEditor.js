import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill, { Quill } from 'react-quill-2';
import 'react-quill-2/dist/quill.snow.css';

import EditorToolbar from 'ui/common/rich-text-editor/EditorToolbar';
import LinkConfigModal from 'ui/common/modal/LinkConfigModal';
import store from 'state/store';
import { setVisibleModal } from 'state/modal/actions';
import { getVisibleModal } from 'state/modal/selectors';

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

function enlink(value) {
  const selection = this.quill.getSelection();
  if (value === 'link' && selection.length > 0) {
    store.dispatch(setVisibleModal(this.quill.id));
  } else {
    this.quill.format('link', false);
  }
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

const modules = {
  toolbar: {
    container: '#editor-toolbar',
    handlers: {
      enlink,
      entable,
      divider,
      history,
      maximize,
      viewSource,
    },
  },
  table: true,
};

const formats = [
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

class RichTextEditor extends Component {
  constructor() {
    super();

    this.state = {};
    this.reactQuill = createRef();
    this.quill = null;

    this.handleLinkConfigSave = this.handleLinkConfigSave.bind(this);
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
    const { url } = values;
    this.quill.format('link', url);
    const { onLinkModalClose } = this.props;
    onLinkModalClose();
  }

  render() {
    const {
      placeholder, disabled, input,
      linkModalVisible, onLinkModalClose,
    } = this.props;

    return (
      <div>
        <EditorToolbar />
        <ReactQuill
          {...input}
          ref={this.reactQuill}
          onBlur={(_, __, editor) => input.onBlur(editor.getHTML())}
          placeholder={placeholder}
          disabled={disabled}
          modules={modules}
          formats={formats}
        />
        <LinkConfigModal
          isVisible={linkModalVisible}
          hasResourceTab
          onSave={this.handleLinkConfigSave}
          onClose={onLinkModalClose}
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
  linkModalVisible: PropTypes.bool.isRequired,
  onLinkModalClose: PropTypes.func.isRequired,
};

RichTextEditor.defaultProps = {
  placeholder: '',
  disabled: false,
};

export default connect(
  (state, props) => ({ linkModalVisible: getVisibleModal(state) === props.input.name }),
  dispatch => ({ onLinkModalClose: () => dispatch(setVisibleModal('')) }),
)(RichTextEditor);
