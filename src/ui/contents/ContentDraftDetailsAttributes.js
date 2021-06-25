import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';

import {
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_NUMBER,
  TYPE_THREESTATE,
  TYPE_TIMESTAMP,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_TEXT,
  TYPE_ATTACH,
  TYPE_IMAGE,
  TYPE_LINK,
  TYPE_MONOTEXT,
  TYPE_EMAIL,
} from 'state/content-type/const';

const ContentDraftDetailsAttributes = ({
  contentAttributes,
  attributes,
  languageSelected,
  isLangDefault,
}) => {
  const [attributeValues, setAttributeValues] = useState(contentAttributes);
  useEffect(() => {
    if (contentAttributes.length < attributes.length) {
      const attrVals = attributes.map(attribute => (
        contentAttributes.find(({ code }) => attribute.code === code)
      ));
      setAttributeValues(attrVals);
    }
  }, [contentAttributes, attributes]);
  return (
    attributes.map((attribute, idx) => {
      let valueDisplay;
      switch (attribute.code) {
        case TYPE_TEXT:
          valueDisplay = (
            <Col xs={12} sm={10} className="ContentDraftDetails__label-attribute-value">
              {attributeValues[idx].values[languageSelected]}
            </Col>
          );
          break;
        default:
          valueDisplay = <div />;
      }
      return (
        <>
          <Col xs={12} sm={2} className="ContentDraftDetails__label-attribute">
            {attribute.name}
          </Col>
          {valueDisplay}
        </>
      );
    })
  );
};

ContentDraftDetailsAttributes.propTypes = {
  contentAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languageSelected: PropTypes.string.isRequired,
  isLangDefault: PropTypes.bool.isRequired,
};

export default ContentDraftDetailsAttributes;
