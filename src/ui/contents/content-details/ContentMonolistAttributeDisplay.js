import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import RenderBasicAttributeDisplay from 'ui/contents/content-details/RenderBasicAttributeDisplay';
import ContentCompositeAttributeDisplay from 'ui/contents/content-details/ContentCompositeAttributeDisplay';
import { TYPE_COMPOSITE } from 'state/content-type/const';

const ContentMonolistAttributeDisplay = ({
  attribute,
  nestedAttribute,
  languageSelected,
  isLangDefault,
}) => {
  const listItems = get(attribute, 'elements', []);
  if (!listItems.length) {
    return 'Empty List';
  }
  return (
    <ul className="media-list">
      {listItems.map((item, idx) => (
        nestedAttribute.type === TYPE_COMPOSITE ? (
          <li className="ContentDetails__list-item composite">
            <span className="label label-default">{idx + 1}</span>
            <span className="media-body">
              <ContentCompositeAttributeDisplay
                attributeValues={item}
                compositeProps={nestedAttribute.compositeAttributes}
                languageSelected={languageSelected}
                isLangDefault={isLangDefault}
              />
            </span>
          </li>
        ) : (
          <li className="ContentDetails__list-item">
            <span className="label label-default">{idx + 1}</span>
            <span className="media-body">
              <RenderBasicAttributeDisplay
                attribute={item}
                attributeType={nestedAttribute.type}
                languageSelected={languageSelected}
                isLangDefault={isLangDefault}
              />
            </span>
          </li>
        )
      ))}
    </ul>
  );
};

ContentMonolistAttributeDisplay.propTypes = {
  attribute: PropTypes.shape({
    listelements: PropTypes.shape({}),
  }).isRequired,
  nestedAttribute: PropTypes.shape({
    type: PropTypes.string,
    compositeAttributes: PropTypes.shape({}),
  }),
  languageSelected: PropTypes.string.isRequired,
  isLangDefault: PropTypes.bool.isRequired,
};

ContentMonolistAttributeDisplay.defaultProps = {
  nestedAttribute: null,
};

export default ContentMonolistAttributeDisplay;
