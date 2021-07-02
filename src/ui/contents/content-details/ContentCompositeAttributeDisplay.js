import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import RenderBasicAttributeDisplay from 'ui/contents/content-details/RenderBasicAttributeDisplay';

const ContentCompositeAttributeDisplay = ({
  attributeValues,
  compositeProps,
  languageSelected,
  isLangDefault,
}) => {
  const [compositeValues, setCompositeValues] = useState(get(attributeValues, 'compositeelements', []));
  useEffect(() => {
    const compValues = get(attributeValues, 'compositeelements', []);
    if (
      compositeProps.length
      && compValues.length
    ) {
      const attrVals = compositeProps.map(attribute => (
        compValues.find(({ code }) => attribute.code === code)
      ));
      setCompositeValues(attrVals);
    }
  }, [attributeValues, compositeProps]);

  return (
    <ul className="media-list">
      {compositeValues.map((item, idx) => (
        <li className="ContentDetails__list-item">
          <span className="label label-default">
            {get(compositeProps[idx], `names.${languageSelected}`, compositeProps[idx].name)}
          </span>
          <span className="media-body">
            <RenderBasicAttributeDisplay
              attribute={item}
              attributeType={compositeProps[idx].type}
              languageSelected={languageSelected}
              isLangDefault={isLangDefault}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};

ContentCompositeAttributeDisplay.propTypes = {
  attributeValues: PropTypes.shape({
    compositeelements: PropTypes.shape({}),
  }).isRequired,
  compositeProps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ).isRequired,
  languageSelected: PropTypes.string.isRequired,
  isLangDefault: PropTypes.bool.isRequired,
};

export default ContentCompositeAttributeDisplay;
