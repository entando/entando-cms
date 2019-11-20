import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import CKEditor from 'ckeditor4-react';

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
      <CKEditor
        data={input.value}
        disabled={disabled}
        placeholder={placeholder}
        config={{
          height: 250,
        }}
        onChange={(event) => {
          input.onChange(event.editor.getData());
        }}
        // Workaround for editor-element-conflict error according to:
        // https://github.com/ckeditor/ckeditor4-react/issues/57#issuecomment-520377696
        onBeforeLoad={(CKEDITOR) => {
          // eslint-disable-next-line no-param-reassign
          CKEDITOR.disableAutoInline = true;
        }}
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
