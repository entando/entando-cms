import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import CategoryTreeFileItem from 'ui/categories/filter/CategoryTreeFilterItem';

class CategoryTreeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeExpanded: true,
    };
    this.onExpandTree = this.onExpandTree.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  onExpandTree() {
    const { onExpandCategory } = this.props;
    const { treeExpanded } = this.state;
    this.setState({
      treeExpanded: !treeExpanded,
    });
    onExpandCategory('home');
  }

  onApply(cat, fileType) {
    const {
      onApplyFilteredSearch, filteringCategories, assetType, paginationOptions,
      onCheckCategory,
    } = this.props;
    let categories = filteringCategories.slice(0);
    const contains = filteringCategories.filter(c => c.code === cat.code).length !== 0;
    if (contains) {
      categories = filteringCategories.filter(c => c.code !== cat.code);
    } else {
      categories.push(cat);
    }
    const { perPage } = paginationOptions;
    const filteringParams = categories.map(
      (filter, i) => `&filters[${i}].attribute=categories&filters[${i}].value=${filter.code}`,
    ).join('');
    const typeParams = assetType === 'all' ? '' : `type=${assetType}`;
    const fetchParams = `?${typeParams}${`&page=${1}&pageSize=${perPage}`}${filteringParams}`;
    onCheckCategory(cat, fileType);
    onApplyFilteredSearch(categories, fetchParams);
  }

  render() {
    const {
      language,
      categories,
      onExpandCategory,
      filteringCategories,
      onCheckCategory,
      minimal,
      filterSubject,
      hideIfEmpty,
    } = this.props;

    const { treeExpanded } = this.state;

    const categoriesWithoutRoot = categories.filter(c => c.code !== 'home');
    const categoryRows = categoriesWithoutRoot.map((category, i) => (
      <CategoryTreeFileItem
        category={category}
        checked={filteringCategories.filter(fc => fc.code === category.code).length > 0}
        key={category.code}
        i={i}
        language={language}
        onExpandCategory={onExpandCategory}
        onCheckCategory={minimal ? onCheckCategory : this.onApply}
        filterSubject={filterSubject}
      />
    ));

    const showNothing = hideIfEmpty
    && (!categoriesWithoutRoot || categoriesWithoutRoot.length === 0);

    return (
      showNothing ? null : (
        <div>
          <table className="CategoryTreeFilter">
            {
            minimal ? null : (
              <thead>
                <tr>
                  <th
                    className="CategoryTreeFilter__head"
                    role="button"
                    onClick={this.onExpandTree}
                    onKeyDown={this.onExpandTree}
                  >
                    <TreeNodeExpandedIcon expanded={treeExpanded} />
                    <span className="CategoryTreeFilter__title">
                      <FormattedMessage id="cms.assets.list.categories" />
                    </span>
                  </th>
                </tr>
              </thead>
            )
          }
            <tbody>{categoryRows}</tbody>
          </table>
          <br />
        </div>
      ));
  }
}

CategoryTreeFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  onExpandCategory: PropTypes.func,
  paginationOptions: PropTypes.shape({}).isRequired,
  onCheckCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  onApplyFilteredSearch: PropTypes.func,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  assetType: PropTypes.string.isRequired,
  minimal: PropTypes.bool,
  filterSubject: PropTypes.string.isRequired,
  hideIfEmpty: PropTypes.bool,
};

CategoryTreeFilter.defaultProps = {
  categories: [],
  onExpandCategory: () => {},
  onCheckCategory: () => {},
  onApplyFilteredSearch: () => {},
  minimal: false,
  hideIfEmpty: false,
};

export default CategoryTreeFilter;
