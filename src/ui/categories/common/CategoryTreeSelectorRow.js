import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Label } from 'patternfly-react';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';

class CategoryTreeSelectorRow extends Component {
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
      language,
      categories,
      onJoinCategory,
      onExpandCategory,
      input: { onChange, value },
    } = this.props;

    return categories.map((category, i) => {
      const onClickExpand = () => {
        if (!category.isEmpty) {
          onExpandCategory(category.code);
        }
      };
      const onClickSelect = () => onChange(category.code);

      const className = ['CategoryTreeSelector__column-td'];
      if (category.isEmpty) {
        className.push('CategoryTreeSelector__column-td--empty');
      }
      // higlight selected code
      if (category.code === value) {
        className.push('info');
      }

      return (
        <tr key={category.code} className="CategoryTreeSelector__row">
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="CategoryTreeSelector__expand-area"
              style={{ paddingLeft: category.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={category.expanded} />
            </span>
            <span
              className="CategoryTreeSelector__select-area"
              role="button"
              tabIndex={i}
              onClick={onClickSelect}
              onKeyDown={onClickSelect}
            >
              <TreeNodeFolderIcon empty={category.isEmpty} />
              <span className="CategoryTreeSelector__category-name">
                {category.titles[language]}
              </span>
              <RowSpinner loading={!!category.loading} />
            </span>
          </td>
          <td className="text-center">
            {category.depth !== 0 ? (
              <span
                className="icon fa fa-plus CategoryTreeSelector__join-mark"
                role="button"
                tabIndex={i}
                onClick={() => onJoinCategory(category.code)}
                onKeyDown={() => onJoinCategory(category.code)}
              />
            ) : null}
          </td>
        </tr>
      );
    });
  }
}

CategoryTreeSelectorRow.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  onExpandCategory: PropTypes.func,
  onJoinCategory: PropTypes.func,
  onUnjoinCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  joinedCategories: PropTypes.arrayOf(PropTypes.shape({})),
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

CategoryTreeSelectorRow.defaultProps = {
  categories: [],
  onExpandCategory: () => { },
  onJoinCategory: () => { },
  onUnjoinCategory: () => { },
  joinedCategories: [],
};

export default CategoryTreeSelectorRow;
