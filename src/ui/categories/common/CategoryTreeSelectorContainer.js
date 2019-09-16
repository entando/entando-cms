import { connect } from 'react-redux';
import CategoryTreeSelector from 'ui/categories/common/CategoryTreeSelector';

import {
  handleExpandCategory,
  onExpandAll,
  onCollapseAll,
  handleJoinCategory,
  onUnjoinCategory,
} from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getJoinedCategories } from 'state/edit-content/selectors';

export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
  joinedCategories: getJoinedCategories(state),
});

export const mapDispatchToProps = dispatch => ({
  onExpandCategory: categoryCode => dispatch(handleExpandCategory(categoryCode)),
  onExpandAll: () => dispatch(onExpandAll()),
  onCollapseAll: () => dispatch(onCollapseAll()),
  onJoinCategory: categoryCode => dispatch(handleJoinCategory(categoryCode)),
  onUnjoinCategory: categoryCode => dispatch(onUnjoinCategory(categoryCode)),
});

const CategoryTreeSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTreeSelector);

export default CategoryTreeSelectorContainer;
