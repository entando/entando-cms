import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextAreaInput from 'ui/common/form/RenderTextAreaInput';
import RenderRichTextEditor from 'ui/common/form/RenderRichTextEditor';

const HypertextAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue || '',
    onChange: (data) => {
      const value = data.target ? data.target.value : data;
      inputOnChange(value);
    },
  };

  return (
    // <TextAreaInput
    //   input={attrInput}
    //   label={label}
    //   meta={meta}
    //   rows={3}
    //   cols={50}
    //   {...rest}
    // />
    <RenderRichTextEditor
      input={attrInput}
      label={label}
      meta={meta}
      {...rest}
    />
  );
};

HypertextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default HypertextAttributeField;
