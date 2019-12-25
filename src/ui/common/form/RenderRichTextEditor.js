import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, ControlLabel } from 'patternfly-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import LinkConfigModal from 'ui/common/modal/LinkConfigModal';
import store from 'state/store';
import { setVisibleModal } from 'state/modal/actions';
import { getVisibleModal } from 'state/modal/selectors';

const undoIcon = (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

const redoIcon = (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

const renderToolbarButton = (format, value, icon) => (
  <button className={`ql-${format}`} value={value} type="button">
    {icon}
  </button>
);

const EditorToolbar = () => (
  <div id="editor-toolbar" style={{ borderBottom: 'none' }}>
    <span className="ql-formats">
      {renderToolbarButton('history', 'undo', undoIcon)}
      {renderToolbarButton('history', 'redo', redoIcon)}
    </span>
    <span className="ql-formats">
      {renderToolbarButton('bold')}
      {renderToolbarButton('italic')}
      {renderToolbarButton('strike')}
    </span>
    <span className="ql-formats">
      {renderToolbarButton('clean')}
    </span>
    <span className="ql-formats">
      {renderToolbarButton('list', 'ordered')}
      {renderToolbarButton('list', 'bullet')}
    </span>
    <span className="ql-formats">
      {renderToolbarButton('indent', '-1')}
      {renderToolbarButton('indent', '+1')}
    </span>
    <span className="ql-formats">
      {renderToolbarButton('blockquote')}
    </span>
    <span className="ql-formats">
      {renderToolbarButton('enlink', 'link', <img src="/images/editor/entandolink-icon.png" alt="Entando Link" />)}
      {renderToolbarButton('enlink', 'unlink', <img src="/images/editor/entandounlink-icon.png" alt="Entando Unlink" />)}
    </span>
  </div>
);

function history(value) {
  if (value === 'undo') {
    this.quill.history.undo();
  } else {
    this.quill.history.redo();
  }
}

function enlink(value) {
  const selection = this.quill.getSelection();
  if (value === 'link' && selection.length > 0) {
    store.dispatch(setVisibleModal(this.quill.id));
  } else {
    this.quill.format('link', false);
  }
}

const modules = {
  toolbar: {
    container: '#editor-toolbar',
    handlers: {
      enlink,
      history,
    },
  },
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
];

class RenderRichTextEditor extends Component {
  constructor() {
    super();

    this.state = {};
    this.reactQuill = createRef();
    this.quill = null;

    this.handleLinkConfigSave = this.handleLinkConfigSave.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();
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
    console.log(values);
    const { url } = values;
    this.quill.format('link', url);
    const { onLinkModalClose } = this.props;
    onLinkModalClose();
  }

  render() {
    const {
      input, append, label, labelSize, placeholder, alignClass,
      meta: { touched, error }, help, disabled, hasLabel,
      linkModalVisible, onLinkModalClose,
    } = this.props;

    return (
      <div className={`RenderRichTextEditor ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        {hasLabel && (
        <Col xs={labelSize} className={`RenderRichTextEditor-label ${alignClass}`}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
        )}
        <Col xs={12 - labelSize} className="RenderRichTextEditor-content">
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
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
        <LinkConfigModal
          isVisible={linkModalVisible}
          onSave={this.handleLinkConfigSave}
          onClose={onLinkModalClose}
        />
      </div>
    );
  }
}

RenderRichTextEditor.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  hasLabel: PropTypes.bool,
  linkModalVisible: PropTypes.bool.isRequired,
  onLinkModalClose: PropTypes.func.isRequired,
};

RenderRichTextEditor.defaultProps = {
  input: {},
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
  alignClass: 'text-right',
  hasLabel: true,
};
export default connect(
  (state, props) => ({ linkModalVisible: getVisibleModal(state) === props.input.name }),
  dispatch => ({ onLinkModalClose: () => dispatch(setVisibleModal('')) }),
)(RenderRichTextEditor);
