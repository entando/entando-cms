import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

const RenderTextInput = ({
  input,
  append,
  label,
  labelSize,
  inputSize,
  alignClass,
  placeholder,
  meta: { touched, error },
  help,
  disabled,
  type,
  hasLabel,
  xsClass,
  ...others
}) => (
  <div className={touched && error ? 'form-group has-error' : 'form-group'}>
    {hasLabel && labelSize > 0 && (
      <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
        <ControlLabel htmlFor={input.name}>
          {label} {help}
        </ControlLabel>
      </Col>
    )}
    <Col xs={12} sm={inputSize || 12 - labelSize}>
      <input
        {...input}
        type={type}
        id={input.name}
        placeholder={placeholder}
        className="form-control RenderTextInput"
        disabled={disabled}
        {...others}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && (error && <span className="help-block">{error}</span>)}
    </Col>
  </div>
);

RenderTextInput.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  hasLabel: PropTypes.bool,
};

RenderTextInput.defaultProps = {
  input: {},
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  type: 'text',
  labelSize: 2,
  inputSize: null,
  append: '',
  alignClass: 'text-right',
  hasLabel: true,
  xsClass: 'mobile-left',
};
export default RenderTextInput;
