import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button, Label } from 'patternfly-react';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';

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

  renderRows() {
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

  render() {
    const { onExpandAll, onCollapseAll, joinedCategories } = this.props;
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
                  Expand All
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
                  Collapse All
                </span>
              </th>
              <th className="text-center" style={{ width: '4%' }}>
                Join
              </th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <br />
        <div>
          {joinedCategories && joinedCategories.length > 0 ? <h4>Content Category List</h4> : null}
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
  onExpandCategory: () => {},
  onExpandAll: () => {},
  onCollapseAll: () => {},
  onJoinCategory: () => {},
  onUnjoinCategory: () => {},
  joinedCategories: [],
};

export default CategoryTreeSelector;
