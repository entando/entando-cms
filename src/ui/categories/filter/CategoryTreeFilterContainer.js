import { connect } from 'react-redux';
import CategoryTreeFilter from 'ui/categories/filter/CategoryTreeFilter';

import { fetchCategoryTreeAll } from 'state/categories/actions';
import { setAssetCategoryFilter } from 'state/assets/actions';
import { setContentCategoryFilter, setJoinContentCategory } from 'state/contents/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getPaginationOptions } from 'state/assets/selectors';

export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
  paginationOptions: getPaginationOptions(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchCategoryTreeAll()),
  onCheckCategory: (category, filterSubject) => {
    if (filterSubject === 'content') {
      dispatch(setContentCategoryFilter(category));
    } else if (filterSubject === 'joinContentCategory') {
      dispatch(setJoinContentCategory(category));
    } else {
      dispatch(setAssetCategoryFilter(category));
    }
  },
});

const CategoryTreeFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTreeFilter);

export default CategoryTreeFilterContainer;
