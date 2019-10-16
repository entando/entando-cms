import { connect } from 'react-redux';
import CategoryTreeSelector from 'ui/categories/common/CategoryTreeSelector';

import { handleExpandCategory, onUnjoinCategory, onJoinCategory } from 'state/categories/actions';
import { getCategoryTree, getJoinedCategoriesByCodes } from 'state/categories/selectors';

export const mapStateToProps = (state) => ({
  categories: getCategoryTree(state),
  getJoinedCategoriesByCodes: getJoinedCategoriesByCodes(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onExpandCategory: (categoryCode) => dispatch(handleExpandCategory(categoryCode)),
  onJoinCategory: (categoryCode) => dispatch(onJoinCategory(categoryCode)),
  onUnjoinCategory: (categoryCode) => dispatch(onUnjoinCategory(categoryCode)),
});

const CategoryTreeSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTreeSelector);

export default CategoryTreeSelectorContainer;
