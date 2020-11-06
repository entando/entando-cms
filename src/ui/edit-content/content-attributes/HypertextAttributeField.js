import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextAreaInput from 'ui/common/form/RenderTextAreaInput';
import RenderRichTextEditor from 'ui/common/form/RenderRichTextEditor';
import { getEditorSettings } from 'state/content-settings/selectors';
import CopyTextButton from 'ui/common/button/CopyTextButton';

const HypertextAttributeField = ({
  label,
  input,
  meta,
  isRTE,
  langCode,
  locale,
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

  if (isRTE) {
    return (
      <RenderRichTextEditor
        input={attrInput}
        label={label}
        meta={meta}
        langCode={langCode}
        {...(
          langCode === locale
          && { extraOptions: (<CopyTextButton text={attrInput.value} />) }
        )}
        {...rest}
      />
    );
  }

  return (
    <TextAreaInput
      input={attrInput}
      label={label}
      meta={meta}
      rows={3}
      cols={50}
      {...(
        langCode === locale
        && { topBarOptions: (<CopyTextButton text={attrInput.value} />) }
      )}
      {...rest}
    />
  );
};

HypertextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  isRTE: PropTypes.bool,
  langCode: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

HypertextAttributeField.defaultProps = {
  isRTE: false,
};

export default connect(
  state => ({
    isRTE: getEditorSettings(state) && getEditorSettings(state).label !== 'None',
  }),
)(HypertextAttributeField);
