import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isNull } from 'lodash';
import { Row, Col, ControlLabel } from 'patternfly-react';
import moment from 'moment';

import ContentAssetDetailsContainer from 'ui/contents/content-details/ContentAssetDetailsContainer';
import ContentLinkDetails from 'ui/contents/content-details/ContentLinkDetails';

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

const CHAR_SPACE = '\u00A0';

const ContentDetailsAttributes = ({
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

  const renderAttribute = (attributeValue, attributeType) => {
    switch (attributeType) {
      case TYPE_NUMBER:
      case TYPE_EMAIL:
      case TYPE_MONOTEXT:
      case TYPE_ENUMERATOR:
      case TYPE_ENUMERATOR_MAP:
        return get(attributeValue, 'value', CHAR_SPACE);
      case TYPE_TEXT:
      case TYPE_LONGTEXT:
        return get(attributeValue, `values.${languageSelected}`, CHAR_SPACE);
      case TYPE_HYPERTEXT:
        return (
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{
            __html: get(attributeValue, `values.${languageSelected}`, CHAR_SPACE),
          }}
          />
        );
      case TYPE_IMAGE:
      case TYPE_ATTACH:
        return (
          <ContentAssetDetailsContainer
            attributeValue={get(attributeValue, `values.${languageSelected}`, CHAR_SPACE)}
            attributeType={attributeType}
          />
        );
      case TYPE_BOOLEAN:
      case TYPE_CHECKBOX:
        return attributeValue.value === true ? 'Yes' : 'No';
      case TYPE_THREESTATE:
        if (isNull(attributeValue.value)) {
          return 'Both';
        }
        return attributeValue.value === true ? 'Yes' : 'No';
      case TYPE_DATE:
        return moment(attributeValue.value, 'YYYY-MM-DD').format('DD/MM/YYYY');
      case TYPE_TIMESTAMP:
        return moment(attributeValue.value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY - HH:mm');
      case TYPE_LINK:
        return (
          <ContentLinkDetails
            linkDetails={attributeValue.value}
            linkLabel={attributeValue.values[languageSelected]}
          />
        );
      default:
        return CHAR_SPACE;
    }
  };

  return (
    <div className="ContentDetails__attributes">
      {attributes.map((attribute, idx) => {
        const valueDisplay = renderAttribute(attributeValues[idx], attribute.type);
        return (
          <div className="ContentDetails__attribute-row">
            <Col xs={12} sm={2} className="ContentDetails__label-attribute">
              {attribute.name}
            </Col>
            <div className="input-group ContentDetails__label-attribute-value">
              {valueDisplay}
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
