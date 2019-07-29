import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';

const RenderSearchFormInput = ({
  input,
  meta,
  onClear,
  placeholder,
  ...others
}) => (
  <div className="SearchForm__textbox">
    <input
      {...input}
      id={input.name}
      type="text"
      className="SearchForm__textbox--base"
      placeholder={placeholder}
      {...others}
    />
    {input.value ? (
      <Button
        className="btn-transparent SearchForm__button-close"
        onClick={onClear}
      >
        <Icon name="close" />
      </Button>
    ) : null}
  </div>
);

RenderSearchFormInput.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  placeholder: PropTypes.string,
  onClear: PropTypes.func,
};

RenderSearchFormInput.defaultProps = {
  input: {},
  meta: {},
  placeholder: 'Search',
  onClear: () => {},
};

export default RenderSearchFormInput;
