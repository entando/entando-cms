import React from 'react';
import PropTypes from 'prop-types';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';

const CategoryTreeSelectorRow = ({
  i,
  category,
  language,
  onJoinCategory,
  onExpandCategory,
  selectedRow,
  setSelectedRow,
  input: { onChange },
}) => {
  const onClickExpand = () => {
    if (!category.isEmpty) {
      onExpandCategory(category.code);
    }
  };
  const onClickSelect = () => setSelectedRow(category.code);
  const onClickJoin = () => {
    onJoinCategory(category.code);
    setSelectedRow(category.code);
    onChange(category.code);
  };

  const className = ['CategoryTreeSelector__column-td'];
  if (category.isEmpty) {
    className.push('CategoryTreeSelector__column-td--empty');
  }
  // higlight selected code
  if (category.code === selectedRow) {
    className.push('info');
  }

  const joinMark = category.depth !== 0 ? (
    <span
      className="icon fa fa-plus CategoryTreeSelector__join-mark"
      role="button"
      tabIndex={i}
      onClick={onClickJoin}
      onKeyDown={onClickJoin}
    />
  ) : null;
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
          <span className="CategoryTreeSelector__category-name">{category.titles[language]}</span>
          <RowSpinner loading={!!category.loading} />
        </span>
      </td>
      <td className="text-center">{joinMark}</td>
    </tr>
  );
};

CategoryTreeSelectorRow.propTypes = {
  i: PropTypes.number.isRequired,
  category: PropTypes.shape({
    isEmpty: PropTypes.bool,
    code: PropTypes.string,
    expanded: PropTypes.bool,
    titles: PropTypes.shape({}),
    depth: PropTypes.number,
    loading: PropTypes.bool,
  }).isRequired,
  onExpandCategory: PropTypes.func,
  onJoinCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  selectedRow: PropTypes.string,
  setSelectedRow: PropTypes.func.isRequired,
};

CategoryTreeSelectorRow.defaultProps = {
  onExpandCategory: () => {},
  onJoinCategory: () => {},
  selectedRow: '',
};

export default CategoryTreeSelectorRow;
