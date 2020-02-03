import { Checkbox } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';

const CategoryTreeFilterItem = ({
  i,
  checked,
  category,
  language,
  onExpandCategory,
  onCheckCategory,
  filterSubject,
  expanded,
}) => {
  const onClickExpand = () => {
    if (!category.isEmpty) {
      onExpandCategory(category.code);
    }
  };
  const onClickSelect = () => onCheckCategory(category, filterSubject);

  const className = ['CategoryTreeSelector__column-td'];
  if (category.isEmpty) {
    className.push('CategoryTreeSelector__column-td--empty');
  }
  const leftPadding = category.depth === 1 ? 13 : category.depth * 20;
  return (
    <tr key={category.code} className="CategoryTreeSelector__row">
      <td className={className.join(' ').trim()}>
        <Checkbox
          style={{ paddingLeft: leftPadding }}
          className="CategoryTreeFilter__item-cb"
          role="button"
          tabIndex={i}
          readOnly
          checked={checked}
          onClick={onClickSelect}
          onKeyDown={onClickSelect}
        >
          <span className="CategoryTreeSelector__select-area">
            <span className="CategoryTreeSelector__category-name">{category.titles[language]}</span>
            <RowSpinner loading={!!category.loading} />
          </span>
        </Checkbox>
        <span
          role="button"
          tabIndex={i}
          className="CategoryTreeFilter__expand-area"
          onClick={onClickExpand}
          onKeyDown={onClickExpand}
        >
          {category.isEmpty ? null : <TreeNodeExpandedIcon expanded={expanded} />}
        </span>
      </td>
    </tr>
  );
};

CategoryTreeFilterItem.propTypes = {
  i: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    isEmpty: PropTypes.bool,
    code: PropTypes.string,
    expanded: PropTypes.bool,
    titles: PropTypes.shape({}),
    depth: PropTypes.number,
    loading: PropTypes.bool,
  }).isRequired,
  onExpandCategory: PropTypes.func,
  onCheckCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  filterSubject: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

CategoryTreeFilterItem.defaultProps = {
  onExpandCategory: () => {},
  onCheckCategory: () => {},
  expanded: false,
};

export default CategoryTreeFilterItem;
