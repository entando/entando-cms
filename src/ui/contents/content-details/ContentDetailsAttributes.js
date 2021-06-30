import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';

import RenderBasicAttributeDisplay from 'ui/contents/content-details/RenderBasicAttributeDisplay';
import ContentListAttributeDisplay from 'ui/contents/content-details/ContentListAttributeDisplay';

import { TYPE_LIST } from 'state/content-type/const';

const ContentDetailsAttributes = ({
  contentAttributes,
  attributes,
  languageSelected,
  isLangDefault,
}) => {
  const [attributeValues, setAttributeValues] = useState(contentAttributes);
  useEffect(() => {
    if (
      contentAttributes.length
      && attributes.length
      && contentAttributes.length < attributes.length
    ) {
      const attrVals = attributes.map(attribute => (
        contentAttributes.find(({ code }) => attribute.code === code)
      ));
      setAttributeValues(attrVals);
    }
  }, [contentAttributes, attributes]);

  const renderAttribute = (attribute, attDef) => {
    switch (attDef.type) {
      case TYPE_LIST:
        return (
          <ContentListAttributeDisplay
            attribute={attribute}
            attributeType={attDef.nestedAttribute.type}
            languageSelected={languageSelected}
            isLangDefault={isLangDefault}
          />
        );
      default:
        return (
          <RenderBasicAttributeDisplay
            attribute={attribute}
            attributeType={attDef.type}
            languageSelected={languageSelected}
            isLangDefault={isLangDefault}
          />
        );
    }
  };

  return (
    <div className="ContentDetails__attributes">
      {attributes.map((attribute, idx) => {
        return (
          <div className="ContentDetails__attribute-row">
            <Col xs={12} sm={2} className="ContentDetails__label-attribute">
              {attribute.name}
            </Col>
            <div className="input-group ContentDetails__label-attribute-value">
              {renderAttribute(attributeValues[idx], attribute)}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

ContentDetailsAttributes.propTypes = {
  contentAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languageSelected: PropTypes.string.isRequired,
  isLangDefault: PropTypes.bool.isRequired,
};

export default ContentDetailsAttributes;
