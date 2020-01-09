import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  InputGroup,
  Icon,
  Button,
} from 'patternfly-react';

const RenderTextChipInput = ({
  input,
  append,
  label,
  labelSize,
  inputSize,
  alignClass,
  meta: { touched, error },
  help,
  hasLabel,
}) => {
  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      const { value } = input;
      const val = e.currentTarget.value;
      input.onChange(value ? [...value, val] : [val]);
      e.currentTarget.value = '';
      e.preventDefault();
    }
  };
  return (
    <div className={touched && error ? 'form-group has-error' : 'form-group'}>
      {hasLabel && labelSize > 0 && (
        <Col xs={12} sm={labelSize} className={alignClass}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={12} sm={inputSize || 12 - labelSize}>
        <FormGroup>
          <InputGroup className="AssetForm__input-chipgroup form-control">
            {(input.value || []).map(val => (
              <InputGroup.Addon key={val} className="AssetForm__input-chip">
                {val}
                <Button className="btn-transparent AssetForm__input-chipclose">
                  <Icon name="close" />
                </Button>
              </InputGroup.Addon>
            ))}
            <FormControl type="text" className="AssetForm__input-chipinput" onKeyPress={onCheckEnter} />
          </InputGroup>
        </FormGroup>
        {append && <span className="AppendedLabel">{append}</span>}
        {touched && (error && <span className="help-block">{error}</span>)}
      </Col>
    </div>
  );
};

RenderTextChipInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  hasLabel: PropTypes.bool,
};

RenderTextChipInput.defaultProps = {
  input: {},
  label: '',
  meta: {},
  help: null,
  labelSize: 2,
  inputSize: null,
  append: '',
  alignClass: 'text-right',
  hasLabel: true,
};
export default RenderTextChipInput;
