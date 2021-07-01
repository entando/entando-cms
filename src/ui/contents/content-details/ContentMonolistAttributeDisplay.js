import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import RenderBasicAttributeDisplay from 'ui/contents/content-details/RenderBasicAttributeDisplay';

const ContentMonolistAttributeDisplay = ({
  attribute,
  attributeType,
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
        <li className="ContentDetails__list-item">
          <span className="label label-default">{idx + 1}</span>
          <span className="media-body">
            <RenderBasicAttributeDisplay
              attribute={item}
              attributeType={attributeType}
              languageSelected={languageSelected}
              isLangDefault={isLangDefault}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};

ContentMonolistAttributeDisplay.propTypes = {
  attribute: PropTypes.shape({
    listelements: PropTypes.shape({}),
  }).isRequired,
  attributeType: PropTypes.string.isRequired,
  languageSelected: PropTypes.string.isRequired,
  isLangDefault: PropTypes.bool.isRequired,
};

export default ContentMonolistAttributeDisplay;
