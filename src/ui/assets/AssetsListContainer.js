import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  getAssetsList,
  getFilteringCategories,
  getAssetsView,
  getFileType,
  getActiveFilters,
  getListFilterParams,
} from 'state/assets/selectors';
import {
  applyAssetsFilter,
  setActiveFilters,
  setListFilterParams,
  fetchAssetsPaged,
  sortAssetsList,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  makeFilter,
  pageDefault,
  fetchRawAssetInfo,
  resetFilteringCategories,
  setAssetCategoryFilter,
} from 'state/assets/actions';
import {
  getLastPage, getPageSize, getTotalItems, getCurrentPage,
} from 'state/pagination/selectors';
import { fetchGroups, setSelectedGroup } from 'state/groups/actions';
import { getLoading } from 'state/loading/selectors';
import { getLocale } from 'state/locale/selectors';
import { getCategoryTree, getCategoryTreeFetched } from 'state/categories/selectors';
import AssetsList from 'ui/assets/AssetsList';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/assets/EditAssetFormModal';
import { DELETE_ASSET_MODAL_ID } from 'ui/assets/DeleteAssetModal';
import { CLONE_ASSET_MODAL_ID } from 'ui/assets/modals/clone-asset/CloneAssetModal';

export const mapStateToProps = state => ({
  assets: getAssetsList(state),
  language: getLocale(state),
  filteringCategories: getFilteringCategories(state),
  activeFilters: getActiveFilters(state),
  assetsView: getAssetsView(state),
  fileType: getFileType(state),
  loading: getLoading(state).assets,
  sort: getListFilterParams(state).sorting || {},
  lastPage: getLastPage(state),
  pageSize: getPageSize(state),
  totalItems: getTotalItems(state),
  page: getCurrentPage(state),
  categories: getCategoryTree(state),
  categoryTreeFetched: getCategoryTreeFetched(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    const {
      browseMode, assetType, ownerGroup, joinGroups,
    } = ownProps;
    if (browseMode) {
      dispatch(changeFileType(assetType));
    } else {
      const filters = {};
      dispatch(setListFilterParams(filters));
      dispatch(fetchGroups({ page: 1, pageSize: 0 }));
      dispatch(fetchAssetsPaged(undefined, undefined, ownerGroup, joinGroups));
    }
  },
  onApplyFilteredSearch: (filters) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(setActiveFilters(filters));
    let filtprops = {};
    if (filters.length) {
      const values = filters.length > 1 ? filters.map(filter => filter.code) : filters[0].code;
      filtprops = { categories: makeFilter(values) };
    }
    dispatch(applyAssetsFilter(filtprops, undefined, ownerGroup, joinGroups));
  },
  onResetFilteringCategories: () => dispatch(resetFilteringCategories()),
  onRemoveActiveFilter: (category, filteringCategories) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(removeActiveFilter(category));
    dispatch(setAssetCategoryFilter(category));
    const newFilters = filteringCategories.filter(c => c.code !== category.code).map(c => c.code);
    const filtSend = newFilters.length ? {
      categories: makeFilter(
        newFilters.length > 1 ? newFilters : newFilters[0],
      ),
    } : {};
    dispatch(applyAssetsFilter(filtSend, undefined, ownerGroup, joinGroups));
  },
  onChangeFileType: (fileType) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(changeFileType(fileType));
    dispatch(fetchAssetsPaged(undefined, undefined, ownerGroup, joinGroups));
  },
  onChangeAssetsView: (assetsView) => {
    dispatch(changeAssetsView(assetsView));
  },
  fetchList: (page = pageDefault) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(fetchAssetsPaged(page, undefined, ownerGroup, joinGroups));
  },
  onApplySort: (sortName) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(sortAssetsList(sortName, undefined, undefined, ownerGroup, joinGroups));
  },
  onRemoveAllActiveFilters: () => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(setActiveFilters([]));
    dispatch(setListFilterParams({}));
    dispatch(fetchAssetsPaged(undefined, undefined, ownerGroup, joinGroups));
  },
  onAssetSelected: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
    dispatch(setSelectedGroup(item.group));
  },
  onClickDelete: (asset) => {
    dispatch(setVisibleModal(DELETE_ASSET_MODAL_ID));
    dispatch(setInfo(asset));
  },
  onUseAssetClicked: (asset) => {
    dispatch(fetchRawAssetInfo(asset.id)).then(ownProps.onUseAsset);
    dispatch(setVisibleModal(''));
  },
  onDuplicateClicked: (asset) => {
    dispatch(setVisibleModal(CLONE_ASSET_MODAL_ID));
    dispatch(setInfo(Object.assign({}, { id: asset.id, name: asset.name })));
  },
});

const AssetsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsList);

export default injectIntl(AssetsListContainer);
