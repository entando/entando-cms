import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import {
  fieldArrayFieldsPropTypes,
} from 'redux-form';

import ContentFormFieldCollapse from 'ui/common/content/ContentFormFieldCollapse';
import attributeShape from './attributeShape';
import AttributeField from './AttributeField';

const CompositeAttributeField = ({
  fields,
  attribute,
  label,
  langCode,
  selectedLangTab,
}) => {
  const { code, compositeAttributes } = attribute;
  const fieldNames = fields.map(name => name);
  const mappedFieldNames = fields.getAll().reduce(
    (acc, curr, idx) => {
      const { code: fieldCode } = curr;
      return {
        ...acc,
        [fieldCode]: fieldNames[idx],
      };
    }, {},
  );
  return (
    <ContentFormFieldCollapse label={label}>
      <Panel className="RenderListField__body">
        <Panel.Body>
          {compositeAttributes.map((attr) => {
            const { code: attrCode } = attr;
            const fieldName = mappedFieldNames[attrCode];
            return (
              <AttributeField
                key={attrCode}
                name={fieldName}
                attribute={attr}
                langCode={langCode}
                selectedLangTab={selectedLangTab}
                isSub
              />
            );
          })}
        </Panel.Body>
      </Panel>
    </ContentFormFieldCollapse>
  );
};

CompositeAttributeField.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
  label: PropTypes.node.isRequired,
  langCode: PropTypes.string.isRequired,
  selectedLangTab: PropTypes.string.isRequired,
};

export default CompositeAttributeField;
