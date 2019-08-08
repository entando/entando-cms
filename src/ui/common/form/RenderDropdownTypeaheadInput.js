import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, DropdownButton } from 'patternfly-react';
import { Typeahead } from 'react-bootstrap-typeahead';

class RenderDropdownTypeaheadInput extends Component {
  constructor(props) {
    super(props);
    this.refTypeahead = React.createRef();
    this.typeaheadFocus = this.typeaheadFocus.bind(this);
    this.valueChanged = this.valueChanged.bind(this);
  }

  valueChanged(selected) {
    const { input } = this.props;
    if (!selected.length) return;
    input.onChange(selected[0]);
    const btn = document.querySelector('.DropdownTypeahead__dropdownbutton');
    btn.click();
  }

  typeaheadFocus() {
    setTimeout(() => this.refTypeahead.current.focus(), 10);
  }

  render() {
    const {
      input, meta: { touched, error }, label, help, labelSize, inputSize,
      labelKey, append, alignClass, placeholder, options, ...others
    } = this.props;
    return (
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
          <DropdownButton
            title={(input.value && input.value[labelKey]) || placeholder}
            id={input.name}
            className="DropdownTypeahead__dropdownbutton"
            onClick={this.typeaheadFocus}
            rootCloseEvent="click"
          >
            <Typeahead
              selectHintOnEnter
              clearButton
              id={input.name}
              options={options}
              ref={this.refTypeahead}
              labelKey={labelKey}
              filterBy={[labelKey]}
              placeholder={placeholder}
              onChange={this.valueChanged}
              className="DropdownTypeahead__droparea"
              {...others}
            />
          </DropdownButton>
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>
    );
  }
}

RenderDropdownTypeaheadInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  labelKey: PropTypes.string,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  inputSize: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  append: PropTypes.string,
  alignClass: PropTypes.string,
};

RenderDropdownTypeaheadInput.defaultProps = {
  input: {},
  label: <span>Select...</span>,
  labelKey: 'label',
  meta: {},
  placeholder: 'Select...',
  help: null,
  labelSize: 2,
  disabled: false,
  inputSize: null,
  append: '',
  alignClass: 'text-right',
};

export default RenderDropdownTypeaheadInput;
