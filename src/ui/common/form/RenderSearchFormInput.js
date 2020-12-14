import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';

const RenderSearchFormInput = ({
  input, meta, onClear, placeholder, textfieldClass, onValueChange, type, ...others
}) => {
  const [hasKeyword, setHasKeyword] = useState(false);
  const inputRef = useRef(null);
  const handleValueChange = (e) => {
    setHasKeyword(true);
    onValueChange(e.currentTarget.value);
  };
  const handleClear = () => {
    setHasKeyword(false);
    if (Object.keys(input).length === 0) {
      inputRef.current.value = '';
    }
    onClear();
  };
  return (
    <div className={['SearchForm__textbox', textfieldClass].join(' ')}>
      <input
        id={input.name}
        {...(Object.keys(input).length > 0
          ? input
          : {
            ref: inputRef,
            id: 'search',
            name: 'search',
            onChange: handleValueChange,
          })}
        type={type}
        className="SearchForm__textbox--base"
        placeholder={placeholder}
        {...others}
      />
      {input.value || hasKeyword ? (
        <Button className="btn-transparent SearchForm__button-close" onClick={handleClear}>
          <Icon name="close" />
        </Button>
      ) : null}
    </div>
  );
};

RenderSearchFormInput.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
  meta: PropTypes.shape({}),
  placeholder: PropTypes.string,
  onClear: PropTypes.func,
  textfieldClass: PropTypes.string,
  onValueChange: PropTypes.func,
  type: PropTypes.string,
};

RenderSearchFormInput.defaultProps = {
  input: {},
  meta: {},
  placeholder: 'Search',
  onClear: () => {},
  textfieldClass: '',
  onValueChange: () => {},
  type: 'text',
};

export default RenderSearchFormInput;
