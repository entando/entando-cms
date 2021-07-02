import React from 'react';
import PropTypes from 'prop-types';
import { get, isNull } from 'lodash';
import moment from 'moment';
import { injectIntl, intlShape } from 'react-intl';

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

import ContentAssetDetailsContainer from 'ui/contents/content-details/ContentAssetDetailsContainer';
import ContentLinkDetails from 'ui/contents/content-details/ContentLinkDetails';

const CHAR_SPACE = '\u00A0';

const RenderBasicAttributeDisplay = ({
  attribute,
  attributeType,
  languageSelected,
  isLangDefault,
  intl,
}) => {
  switch (attributeType) {
    case TYPE_NUMBER:
    case TYPE_EMAIL:
    case TYPE_MONOTEXT:
    case TYPE_ENUMERATOR:
    case TYPE_ENUMERATOR_MAP:
      return get(attribute, 'value', CHAR_SPACE);
    case TYPE_TEXT:
    case TYPE_LONGTEXT:
      return get(attribute, `values.${languageSelected}`, CHAR_SPACE);
    case TYPE_HYPERTEXT:
      return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{
          __html: get(attribute, `values.${languageSelected}`, CHAR_SPACE),
        }}
        />
      );
    case TYPE_IMAGE:
    case TYPE_ATTACH:
      return (
        <ContentAssetDetailsContainer
          attributeValue={get(attribute, `values.${languageSelected}`, CHAR_SPACE)}
          attributeType={attributeType}
        />
      );
    case TYPE_BOOLEAN:
    case TYPE_CHECKBOX:
      return intl.formatMessage(`cms.label.${attribute.value === true ? 'yes' : 'no'}`);
    case TYPE_THREESTATE:
      if (isNull(attribute.value)) {
        return intl.formatMessage('cms.label.both');
      }
      return intl.formatMessage(`cms.label.${attribute.value === true ? 'yes' : 'no'}`);
    case TYPE_DATE:
      return attribute.value ? moment(attribute.value, 'YYYY-MM-DD').format('DD/MM/YYYY') : CHAR_SPACE;
    case TYPE_TIMESTAMP:
      return attribute.value ? moment(attribute.value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY - HH:mm') : CHAR_SPACE;
    case TYPE_LINK:
      return attribute.value ? (
        <ContentLinkDetails
          linkDetails={attribute.value}
          linkLabel={attribute.values[languageSelected]}
        />
      ) : CHAR_SPACE;
    default:
      return CHAR_SPACE;
  }
};

RenderBasicAttributeDisplay.propTypes = {
  intl: intlShape.isRequired,
  attribute: PropTypes.shape({
    value: PropTypes.any,
    values: PropTypes.shape({}),
  }),
  languageSelected: PropTypes.string.isRequired,
  isLangDefault: PropTypes.bool.isRequired,
};

export default injectIntl(RenderBasicAttributeDisplay);
