import { connect } from 'react-redux';
import {
  getAssetsList,
  getFilteringCategories,
  getLanguage,
  getAssetsView,
  getFileType,
  getSort,
  getPaginationOptions,
  getActiveFilters,
} from 'state/assets/selectors';
import {
  fetchAssets,
  setActiveFilters,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  applySort,
  changePagination,
} from 'state/assets/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { getLoading } from 'state/loading/selectors';
import AssetsList from 'ui/assets/AssetsList';

export const mapStateToProps = state => ({
  assets: getAssetsList(state),
  language: getLanguage(state),
  filteringCategories: getFilteringCategories(state),
  activeFilters: getActiveFilters(state),
  assetsView: getAssetsView(state),
  fileType: getFileType(state),
  loading: getLoading(state).assets,
  sort: getSort(state),
  paginationOptions: getPaginationOptions(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (params) => {
    dispatch(fetchAssets(params));
    dispatch(fetchCategoryTree());
  },
  onApplyFilteredSearch: (filters, filterParams) => {
    dispatch(setActiveFilters(filters));
    dispatch(fetchAssets(filterParams));
  },
  onRemoveActiveFilter: (filter) => {
    dispatch(removeActiveFilter(filter));
  },
  onChangeFileType: (fileType) => {
    dispatch(changeFileType(fileType));
  },
  onChangeAssetsView: (assetsView) => {
    dispatch(changeAssetsView(assetsView));
  },
  refetchAssets: (params) => {
    dispatch(fetchAssets(params));
  },
  onApplySort: (sortName) => {
    dispatch(applySort(sortName));
  },
  onChangePaginationOptions: (paginationOptions) => {
    dispatch(changePagination(paginationOptions));
  },
  onRemoveAllActiveFilters: () => {
    dispatch(setActiveFilters([]));
  },
});

const AssetsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsList);

export default AssetsListContainer;
