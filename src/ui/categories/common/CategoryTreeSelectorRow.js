import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useRovingTabIndex,
  useFocusEffect,
} from "react-roving-tabindex";

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';
import {
  CONFIRM_KEYS,
  HORIZONTAL_ARROW_KEYS,
  KEY_RIGHT,
} from 'ui/common/accessibility/KeyCodes';

const CategoryTreeSelectorRow = ({
  i,
  category,
  language,
  disabled,
  onJoinCategory,
  onToggleExpandCategory,
  onExpandCategory,
  selectedRow,
  setSelectedRow,
  input: { onChange },
}) => {
  const ref = useRef(null);

  const [
    tabIndex,
    focused,
    handleKeyDownRove,
    handleClickRove,
  ] = useRovingTabIndex(ref, disabled);

  useFocusEffect(focused, ref);

  const categoryJoinable = category.depth !== 0;
  const categoryNotEmpty = !category.isEmpty;

  const eventConfirmed = ({ type, keyCode }) => {
    const clickConfirmed = type === 'click';
    const keyConfirmed = type === 'keydown' && CONFIRM_KEYS.includes(keyCode);
    return {
      clickConfirmed,
      keyConfirmed,
    };
  };

  const onClickExpand = (e) => {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventConfirmed(e);

    if (categoryNotEmpty && (clickConfirmed || keyConfirmed)) {
      onToggleExpandCategory(category.code);
    }
    if (clickConfirmed) {
      handleKeyDownRove(e);
    }
    if (keyConfirmed) {
      handleClickRove(e);
    }
  };

  const onClickSelect = () => setSelectedRow(category.code);
  const onClickJoin = (e) => {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventConfirmed(e);
    if (categoryJoinable && (clickConfirmed || keyConfirmed)) {
      onJoinCategory(category.code);
      setSelectedRow(category.code);
      onChange(category.code);
    }
    if (clickConfirmed) {
      handleKeyDownRove(e);
    }
    if (keyConfirmed) {
      handleClickRove(e);
    }
  };

  const handleKeyDown = (e) => {
    if (categoryNotEmpty && HORIZONTAL_ARROW_KEYS.includes(e.keyCode)) {
      onExpandCategory(category.code, e.keyCode === KEY_RIGHT);
    } else if (categoryJoinable && CONFIRM_KEYS.includes(e.keyCode)) {
      onClickJoin(e);
    } else {
      handleKeyDownRove(e);
    }
  };

  const className = ['CategoryTreeSelector__column-td'];
  if (category.isEmpty) {
    className.push('CategoryTreeSelector__column-td--empty');
  }
  // higlight selected code
  if (category.code === selectedRow) {
    className.push('info');
  }

  const joinMark = categoryJoinable ? (
    <span
      className="icon fa fa-plus CategoryTreeSelector__join-mark"
      role="button"
      tabIndex={i}
      onClick={onClickJoin}
      onKeyDown={onClickJoin}
    />
  ) : null;
  return (
    <tr
      key={category.code}
      ref={ref}
      tabIndex={tabIndex}
      className="CategoryTreeSelector__row"
      onKeyDown={handleKeyDown}
      onClick={handleClickRove}
    >
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
  disabled: PropTypes.bool,
  onToggleExpandCategory: PropTypes.func,
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
  onToggleExpandCategory: () => {},
  onExpandCategory: () => {},
  onJoinCategory: () => {},
  selectedRow: '',
  disabled: false,
};

export default CategoryTreeSelectorRow;
