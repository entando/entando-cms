import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { formattedText } from '@entando/utils';

const RenderSelectInput = ({
  input,
  meta: { touched, error },
  labelSize,
  alignClass,
  label,
  help,
  defaultOptionId,
  options,
  optionReducer,
  optionValue,
  optionDisplayName,
  size,
  inputSize,
  disabled,
  append,
}) => {
  const containerClasses = touched && error ? 'form-group has-error' : 'form-group';

  const defaultOption = defaultOptionId ? (
    <option value="">{formattedText(defaultOptionId)}</option>
  ) : null;

  const optionsList = optionReducer
    ? optionReducer(options)
    : options.map(item => (
      <option key={item[optionValue]} value={item[optionValue]}>
        {item[optionDisplayName]}
      </option>
    ));

  const errorBox = touched && error ? <span className="help-block">{error}</span> : null;
  return (
    <div className={containerClasses}>
      <Col sm={labelSize} className={alignClass} xs={12}>
        <ControlLabel htmlFor={input.name}>
          {label} {help}
        </ControlLabel>
      </Col>
      <Col sm={inputSize || 12 - labelSize} xs={12}>
        <div className={append ? 'input-group' : ''}>
          <select
            {...input}
            size={size}
            className="form-control RenderSelectInput"
            disabled={disabled}
          >
            {defaultOption}
            {optionsList}
          </select>
          {append && <span className="input-group-btn">{append}</span>}
          {errorBox}
        </div>
      </Col>
    </div>
  );
};

RenderSelectInput.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  defaultOptionId: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
    }),
  ),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  alignClass: PropTypes.string,
  help: PropTypes.node,
  optionReducer: PropTypes.func,
  optionValue: PropTypes.string,
  optionDisplayName: PropTypes.string,
  size: PropTypes.number,
  inputSize: PropTypes.number,
  disabled: PropTypes.bool,
  append: PropTypes.node,
};

RenderSelectInput.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: {},
  },
  defaultOptionId: '',
  options: [],
  label: null,
  append: null,
  labelSize: 2,
  alignClass: 'text-right',
  help: null,
  optionReducer: null,
  optionValue: 'value',
  optionDisplayName: 'text',
  size: null,
  inputSize: null,
  disabled: false,
};
export default RenderSelectInput;
