import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const renderToolbarButton = (format, value) => (
  <button className={`ql-${format}`} value={value} type="button" />
);

const EditorToolbar = () => (
  <div id="editor-toolbar" style={{ borderBottom: 'none' }}>
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
  </div>
);

const modules = {
  toolbar: {
    container: '#editor-toolbar',
    // handlers: {

    // },
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
];

const RenderRichTextEditor = ({
  input, append, label, labelSize, placeholder, alignClass,
  meta: { touched, error }, help, disabled, hasLabel,
}) => (
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
        onBlur={(_, __, editor) => input.onBlur(editor.getHTML())}
        placeholder={placeholder}
        disabled={disabled}
        modules={modules}
        formats={formats}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>

);

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
export default RenderRichTextEditor;
