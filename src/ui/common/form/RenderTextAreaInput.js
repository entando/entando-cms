import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

const RenderTextAreaInput = ({
  input, append, label, labelSize, placeholder, alignClass,
  meta: { touched, error }, help, disabled, cols, rows,
  hasLabel, topBarOptions,
}) => (

  <div className={`RenderTextAreaInput ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
    {hasLabel && (
      <Col xs={labelSize} className={`RenderTextAreaInput__label ${alignClass}`}>
        <ControlLabel htmlFor={input.name}>
          {label} {help}
        </ControlLabel>
      </Col>
    )}
    <Col xs={12 - labelSize} className="RenderTextAreaInput__content">
      <div className="RenderTextAreaInput__textarea-body">
        {topBarOptions && (
          <div className="RenderTextAreaInput__toolbar-body text-right">
            {topBarOptions}
          </div>
        )}
        <textarea
          {...input}
          cols={cols}
          rows={rows}
          placeholder={placeholder}
          className="form-control RenderTextAreaInput-textarea"
          disabled={disabled}
        />
      </div>
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>

);

RenderTextAreaInput.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  name: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  hasLabel: PropTypes.bool,
  topBarOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RenderTextAreaInput.defaultProps = {
  input: {},
  name: '',
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
  alignClass: 'text-right',
  cols: 20,
  rows: 20,
  hasLabel: true,
  topBarOptions: null,
};
export default RenderTextAreaInput;
