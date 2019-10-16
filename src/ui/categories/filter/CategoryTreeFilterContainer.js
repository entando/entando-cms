import { connect } from 'react-redux';
import CategoryTreeFilter from 'ui/categories/filter/CategoryTreeFilter';

import { handleExpandCategory } from 'state/categories/actions';
import { setCategoryFilter } from 'state/assets/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getPaginationOptions } from 'state/assets/selectors';

export const mapStateToProps = (state) => ({
  categories: getCategoryTree(state),
  paginationOptions: getPaginationOptions(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onExpandCategory: (categoryCode) => dispatch(handleExpandCategory(categoryCode)),
  onCheckCategory: (category) => dispatch(setCategoryFilter(category)),
});

const CategoryTreeFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTreeFilter);

export default CategoryTreeFilterContainer;
