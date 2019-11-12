import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

import RowSpinner from 'ui/common/RowSpinner';

const CategoryTreeItem = ({
  i,
  checked,
  category,
  language,
  onCheckCategory,
}) => {
  const onClickSelect = () => onCheckCategory(category);

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
      </td>
    </tr>
  );
};

CategoryTreeItem.propTypes = {
  i: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  category: PropTypes.shape({}).isRequired,
  onCheckCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
};

CategoryTreeItem.defaultProps = {
  onCheckCategory: () => {},
};

export default CategoryTreeItem;
