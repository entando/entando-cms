import { connect } from 'react-redux';
import { getDomain } from '@entando/apimanager';
import {
  getAssetsList,
  getFilteringCategories,
  getLanguage,
  getAssetsView,
  getFileType,
  getSort,
  getActiveFilters,
  condenseAssetInfo,
} from 'state/assets/selectors';
import {
  fetchAssets,
  setActiveFilters,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  applySort,
} from 'state/assets/actions';
import {
  getLastPage, getPageSize, getTotalItems, getCurrentPage,
} from 'state/pagination/selectors';
import { fetchGroup } from 'state/groups/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { getLoading } from 'state/loading/selectors';
import AssetsList from 'ui/assets/AssetsList';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/assets/EditAssetFormModal';

export const mapStateToProps = state => ({
  assets: getAssetsList(state),
  language: getLanguage(state),
  filteringCategories: getFilteringCategories(state),
  activeFilters: getActiveFilters(state),
  assetsView: getAssetsView(state),
  fileType: getFileType(state),
  loading: getLoading(state).assets,
  sort: getSort(state),
  lastPage: getLastPage(state),
  pageSize: getPageSize(state),
  totalItems: getTotalItems(state),
  page: getCurrentPage(state),
  apiUrl: getDomain(state),
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
  onRemoveAllActiveFilters: () => {
    dispatch(setActiveFilters([]));
  },
  onAssetSelected: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    const asset = condenseAssetInfo(item);
    dispatch(setInfo(asset));
    dispatch(fetchGroup(asset.group));
  },
});

const AssetsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsList);

export default AssetsListContainer;
