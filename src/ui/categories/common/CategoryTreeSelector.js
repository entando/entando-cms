import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Label } from 'patternfly-react';

import CategoryTreeSelectorRow from 'ui/categories/common/CategoryTreeSelectorRow';

class CategoryTreeSelector extends Component {
  renderTags() {
    const { joinedCategories, language, onUnjoinCategory } = this.props;
    return joinedCategories.map((value, i) => {
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
  }

  render() {
    const {
      input,
      language,
      categories,
      onExpandAll,
      onCollapseAll,
      onJoinCategory,
      onExpandCategory,
      joinedCategories,
      onUnjoinCategory,
    } = this.props;

    return (
      <div>
        <table className="CategoryTreeSelector table table-bordered table-hover table-treegrid">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="category.tree" />
                <span
                  className="CategoryTreeSelector__action"
                  role="button"
                  onClick={onExpandAll}
                  onKeyDown={onExpandAll}
                  tabIndex={0}
                >
                  <span
                    className="fa fa-plus-square-o CategoryTreeSelector__action-icon"
                    aria-hidden="true"
                  />
                  <FormattedMessage id="cms.categories.expandAll" />
                </span>
                <span
                  className="CategoryTreeSelector__action"
                  role="button"
                  onClick={onCollapseAll}
                  onKeyDown={onCollapseAll}
                  tabIndex={0}
                >
                  <span
                    className="fa fa-minus-square-o CategoryTreeSelector__action-icon"
                    aria-hidden="true"
                  />
                  <FormattedMessage id="cms.categories.collapseAll" />
                </span>
              </th>
              <th className="text-center" style={{ width: '4%' }}>
                <FormattedMessage id="cms.join" />
              </th>
            </tr>
          </thead>
          <tbody>
            <CategoryTreeSelectorRow
              language={language}
              categories={categories}
              onExpandCategory={onExpandCategory}
              onJoinCategory={onJoinCategory}
              onUnjoinCategory={onUnjoinCategory}
              input={input}
            />
          </tbody>
        </table>
        <br />
        <div>
          {joinedCategories && joinedCategories.length > 0
            ? <h4><FormattedMessage id="cms.contents.edit.contentCategoryList" /></h4> : null}
          <ul className="CategoryTreeSelector__tag-container list-inline">{this.renderTags()}</ul>
        </div>
      </div>
    );
  }
}

CategoryTreeSelector.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),

  onExpandCategory: PropTypes.func,

  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
  onJoinCategory: PropTypes.func,
  onUnjoinCategory: PropTypes.func,

  language: PropTypes.string.isRequired,

  joinedCategories: PropTypes.arrayOf(PropTypes.shape({})),

  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

CategoryTreeSelector.defaultProps = {
  categories: [],
  onExpandCategory: () => { },
  onExpandAll: () => { },
  onCollapseAll: () => { },
  onJoinCategory: () => { },
  onUnjoinCategory: () => { },
  joinedCategories: [],
};

export default CategoryTreeSelector;
