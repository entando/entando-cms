import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Label } from 'patternfly-react';

import CategoryTreeSelectorRow from 'ui/categories/common/CategoryTreeSelectorRow';

const CategoryTreeSelector = ({
  input,
  language,
  categories,
  onJoinCategory,
  onExpandCategory,
  getJoinedCategoriesByCodes: joinedCategories,
  onUnjoinCategory,
}) => {
  const contentCategoriesText = joinedCategories && joinedCategories.length > 0
    ? <h4><FormattedMessage id="cms.contents.edit.contentCategoryList" /></h4> : null;

  const renderedTags = joinedCategories.map((value, i) => {
    const countSlashes = (value.fullTitles[language].match(/\//g) || []).length;
    return (
      <li key={value.code}>
        <Label key={value.code} bsStyle="info" className="CategoryTreeSelector__tag">
          <span className="icon fa fa-tag" />
          {'.. / '.repeat(countSlashes)}
          {value.titles[language]}
          <Button
            bsStyle="link"
            className="MultiSelectRenderer__remove-tag-btn"
            onClick={() => onUnjoinCategory(value.code)}
          >
            <i className="fa fa-times" />
          </Button>
        </Label>
      </li>
    );
  });

  const categoryRows = categories.map((category, i) => (
    <CategoryTreeSelectorRow
      category={category}
      key={category.code}
      i={i}
      language={language}
      onExpandCategory={onExpandCategory}
      onJoinCategory={onJoinCategory}
      onUnjoinCategory={onUnjoinCategory}
      input={input}
    />
  ));

  return (
    <div>
      <table className="CategoryTreeSelector table table-bordered table-hover table-treegrid">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="category.tree" />
            </th>
            <th className="text-center" style={{ width: '4%' }}>
              <FormattedMessage id="cms.join" />
            </th>
          </tr>
        </thead>
        <tbody>
          {categoryRows}
        </tbody>
      </table>
      <br />
      <div>
        {contentCategoriesText}
        <ul className="CategoryTreeSelector__tag-container list-inline">{renderedTags}</ul>
      </div>
    </div>
  );
};

CategoryTreeSelector.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  onExpandCategory: PropTypes.func,
  onJoinCategory: PropTypes.func,
  onUnjoinCategory: PropTypes.func,

  language: PropTypes.string.isRequired,

  getJoinedCategoriesByCodes: PropTypes.arrayOf(PropTypes.shape({})),

  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

CategoryTreeSelector.defaultProps = {
  categories: [],
  getJoinedCategoriesByCodes: [],
  onExpandCategory: () => { },
  onJoinCategory: () => { },
  onUnjoinCategory: () => { },
};

export default CategoryTreeSelector;
