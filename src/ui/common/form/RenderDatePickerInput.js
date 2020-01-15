import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull } from 'lodash';

class RenderDatePickerInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { onDidMount, ...otherProps } = this.props;
    onDidMount(otherProps);
  }

  handleChange(date) {
    const { dateFormat, input } = this.props;
    const value = !isNull(date) ? date.format(dateFormat) : '';
    input.onChange(value);
  }

  render() {
    const {
      input,
      name,
      label,
      help,
      locale,
      dateFormat,
      placeholder,
      meta: { touched, error },
      isClearable,
      hasLabel,
    } = this.props;

    const errorblock = touched ? error : '';

    return (
      <div className="form-group">
        {hasLabel && (
          <label htmlFor={name} className="col-xs-2 control-label">
            {label} {help}
          </label>
        )}
        <Col xs={10}>
          <DatePicker
            {...input}
            placeholder={placeholder}
            selected={input.value ? moment(input.value, dateFormat) : null}
            onChange={this.handleChange}
            disabledKeyboardNavigation
            locale={locale}
            dateFormat={dateFormat}
            isClearable={isClearable}
            calendarClassName="RenderDatePickerInput__calendar"
          />
          <div className="help-block help-block-error">{errorblock}</div>
        </Col>
      </div>
    );
  }
}

RenderDatePickerInput.propTypes = {
  onDidMount: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  help: PropTypes.node,
  language: PropTypes.string,
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  isClearable: PropTypes.bool,
  hasLabel: PropTypes.bool,
};

RenderDatePickerInput.defaultProps = {
  onDidMount: () => {},
  name: '',
  placeholder: '',
  label: '',
  help: null,
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  locale: 'en',
  meta: {},
  isClearable: true,
  hasLabel: true,
};
export default RenderDatePickerInput;
