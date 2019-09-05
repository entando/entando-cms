import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required, formattedText } from '@entando/utils';
import { MODE_EDIT, MODE_ADD } from 'state/content-type/const';

export const element = value => (
  value && !/^[a-zA-Z0-9_]+(,[a-zA-Z0-9_]+)*$/i.test(value)
    ? <FormattedMessage id="validateForm.element" /> : undefined
);

const AttributeEnumSettings = ({ enumeratorExtractorBeans, mode }) => {
  const selectAllowedOptions = enumeratorExtractorBeans.map(item => (
    {
      value: item,
      text: item,
    }
  ));
  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="cms.label.settings" />
          </legend>
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItems"
            label={
              <FormLabel labelId="cms.contenttype.enumeratorStaticItems" required />
            }
            placeholder={formattedText('cms.contenttype.enumeratorStaticItems.help')}
            validate={[required, element]}
          />
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItemsSeparator"
            label={
              <FormLabel labelId="cms.contenttype.enumeratorStaticItemsSeparator" />
            }
          />
          {
            mode === MODE_ADD ? (
              <Field
                component={RenderSelectInput}
                options={selectAllowedOptions}
                defaultOptionId="cms.label.chooseoption"
                label={
                  <FormLabel labelId="cms.contenttype.enumeratorExtractorBean" />
              }
                name="enumeratorExtractorBean"
              />
            ) : (
              <Field
                component={RenderTextInput}
                name="enumeratorExtractorBean"
                label={
                  <FormLabel labelId="cms.contenttype.enumeratorExtractorBean" />
                }
                disabled
              />
            )
          }

        </fieldset>
      </Col>
    </Row>
  );
};

AttributeEnumSettings.propTypes = {
  enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.oneOf([MODE_ADD, MODE_EDIT]),
};

AttributeEnumSettings.defaultProps = {
  enumeratorExtractorBeans: [],
  mode: MODE_ADD,
};

export default AttributeEnumSettings;
