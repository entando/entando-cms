import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { addToast, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
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
  fetchAssets,
  setActiveFilters,
  setListFilterParams,
  fetchAssetsPaged,
  sortAssetsList,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  makeFilter,
  pageDefault,
  sendUploadAsset,
} from 'state/assets/actions';
import {
  getLastPage, getPageSize, getTotalItems, getCurrentPage,
} from 'state/pagination/selectors';
import { fetchGroups, setSelectedGroup } from 'state/groups/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { toggleLoading } from 'state/loading/actions';
import { getLoading } from 'state/loading/selectors';
import { getLocale } from 'state/locale/selectors';
import AssetsList from 'ui/assets/AssetsList';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/assets/EditAssetFormModal';
import { DELETE_ASSET_MODAL_ID } from 'ui/assets/DeleteAssetModal';

const uploadAssetMsgs = defineMessages({
  uploaded: {
    id: 'cms.assets.form.duplicated',
    defaultMessage: '{name} uploaded.',
  },
  uploadFailed: {
    id: 'cms.assets.errors.failedToUpload',
    defaultMessage: 'Failed to upload an asset, server error has occurred.',
  },
});

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
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onDidMount: () => {
    dispatch(setListFilterParams({}));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchAssetsPaged());
    dispatch(fetchCategoryTree());
  },
  onApplyFilteredSearch: (filters) => {
    dispatch(setActiveFilters(filters));
    let filtprops = {};
    if (filters.length) {
      const values = filters.length > 1 ? filters.map(filter => filter.code) : filters[0].code;
      filtprops = { categories: makeFilter(values) };
    }
    dispatch(applyAssetsFilter(filtprops));
  },
  onRemoveActiveFilter: (category, filteringCategories) => {
    dispatch(removeActiveFilter(category));
    const newFilters = filteringCategories.filter(c => c.code !== category.code).map(c => c.code);
    const filtSend = newFilters.length ? {
      categories: makeFilter(
        newFilters.length > 1 ? newFilters : newFilters[0],
      ),
    } : {};
    dispatch(applyAssetsFilter(filtSend));
  },
  onChangeFileType: (fileType) => {
    dispatch(changeFileType(fileType));
    dispatch(fetchAssetsPaged());
  },
  onChangeAssetsView: (assetsView) => {
    dispatch(changeAssetsView(assetsView));
  },
  fetchList: (page = pageDefault) => (
    dispatch(fetchAssetsPaged(page))
  ),
  refetchAssets: (params) => {
    dispatch(fetchAssets(params));
  },
  onApplySort: (sortName) => {
    dispatch(sortAssetsList(sortName));
  },
  onRemoveAllActiveFilters: () => {
    dispatch(setActiveFilters([]));
    dispatch(setListFilterParams({}));
    dispatch(fetchAssetsPaged());
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
  onDuplicateClicked: (asset) => {
    dispatch(toggleLoading('assets'));
    const { group, categories } = asset;
    const fileObject = Object.assign({}, asset);
    fileObject.path = asset.versions[0].path;
    const configObject = Object.assign({}, { fileObject, group: group.code, categories });
    dispatch(sendUploadAsset(configObject))
      .then((res) => {
        dispatch(toggleLoading('assets'));
        if (res && !res.hasError) {
          dispatch(
            addToast(
              intl.formatMessage(uploadAssetMsgs.uploaded, { name: res.name }),
              TOAST_SUCCESS,
            ),
          );
        }
        if (res && res.hasError) {
          dispatch(
            addToast(
              intl.formatMessage(uploadAssetMsgs.uploadFailed),
              TOAST_ERROR,
            ),
          );
        }
        dispatch(fetchAssetsPaged());
      });
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
