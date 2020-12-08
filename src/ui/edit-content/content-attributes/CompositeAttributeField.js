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
  isSub,
  openedAtStart,
  mainGroup,
  joinGroups,
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

  const panelBody = (
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
            mainGroup={mainGroup}
            joinGroups={joinGroups}
            isSub
          />
        );
      })}
    </Panel.Body>
  );


  if (isSub) {
    return (
      <Row key={code}>
        <label className="control-label col-xs-2">
          {label}
        </label>
        <Col xs={10}>
          <Panel>
            {panelBody}
          </Panel>
        </Col>
      </Row>
    );
  }
  return (
    <ContentFormFieldCollapse label={label} showContentAtStart={openedAtStart}>
      <Panel className="RenderListField__body">
        {panelBody}
      </Panel>
    </ContentFormFieldCollapse>
  );
};

CompositeAttributeField.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
  label: PropTypes.string.isRequired,
  langCode: PropTypes.string.isRequired,
  selectedLangTab: PropTypes.string.isRequired,
  isSub: PropTypes.bool,
  openedAtStart: PropTypes.bool,
  mainGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
};

CompositeAttributeField.defaultProps = {
  isSub: false,
  openedAtStart: false,
  mainGroup: '',
  joinGroups: [],
};

export default CompositeAttributeField;
