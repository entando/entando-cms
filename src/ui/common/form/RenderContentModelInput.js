import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { Col, ControlLabel } from 'patternfly-react';

/* eslint-disable import/no-extraneous-dependencies */
import 'brace/mode/html';
import 'brace/theme/github';
/* eslint-disable import/no-extraneous-dependencies */

const RenderContentModelInput = ({
  input, meta: { touched, error }, label, help,
  labelSize, inputSize, append, prepend, alignClass,
}) => (
  <div className={(touched && error) ? 'DropdownTypeahead form-group has-error' : 'DropdownTypeahead form-group'}>
    {
      labelSize > 0 ? (
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      ) : ''
    }
    <Col xs={inputSize || 12 - labelSize}>
      {prepend}
      <AceEditor
        {...input}
        mode="html"
        theme="github"
        width="100%"
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
        style={{ border: '1px solid #ddd' }}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>
);

RenderContentModelInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  prepend: PropTypes.node,
  append: PropTypes.string,
  alignClass: PropTypes.string,
};

RenderContentModelInput.defaultProps = {
  input: {},
  label: '',
  meta: {},
  help: null,
  disabled: false,
  type: 'text',
  labelSize: 2,
  inputSize: null,
  append: '',
  prepend: '',
  alignClass: 'text-right',
};

export default RenderContentModelInput;
