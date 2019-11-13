import { compact } from 'lodash';
import {
  addErrors,
  addToast,
  TOAST_ERROR,
  clearErrors,
} from '@entando/messages';
import {
  convertToQueryString,
  FILTER_OPERATORS,
  SORT_DIRECTIONS,
} from '@entando/utils';
import {
  SET_ASSETS,
  SET_ASSET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  FILE_TYPE_CHANGE,
  ASSETS_VIEW_CHANGE,
  SET_ASSET_SYNC,
  SET_LIST_FILTER_PARAMS,
} from 'state/assets/types';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import {
  getFileType,
  getListFilterParams,
} from 'state/assets/selectors';
import { getAssets, editAsset, deleteAsset } from 'api/assets';

export const setAssetCategoryFilter = category => ({
  type: SET_ASSET_CATEGORY_FILTER,
  payload: category,
});

export const setAssets = assets => ({
  type: SET_ASSETS,
  payload: assets,
});

export const setActiveFilters = filters => ({
  type: SET_ACTIVE_FILTERS,
  payload: filters,
});

export const removeActiveFilter = filter => ({
  type: REMOVE_ACTIVE_FILTER,
  payload: filter,
});

export const changeFileType = fileType => ({
  type: FILE_TYPE_CHANGE,
  payload: fileType,
});

export const changeAssetsView = assetsView => ({
  type: ASSETS_VIEW_CHANGE,
  payload: assetsView,
});

export const setAssetChanged = asset => ({
  type: SET_ASSET_SYNC,
  payload: asset,
});

export const setListFilterParams = params => ({
  type: SET_LIST_FILTER_PARAMS,
  payload: params,
});

export const pageDefault = { page: 1, pageSize: 10 };

export const fetchAssets = (page, params) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('assets'));
  getAssets(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setAssets(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('assets'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchAssetsPaged = (
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const state = getState();
  // const filteringCategories = getFilteringCategories(state);
  const fileType = getFileType(state);
  let filters = getListFilterParams(state);

  /* const sortParams = sort && sort.name && sort.direction
    ? `&sort=${sort.name}&direction=${sort.direction}`
    : '';
  const filteringParams = filteringCategories.map(
    (filter, i) => `&filters[${i}].attribute=categories&filters[${i}].value=${filter.code}`,
  ).join('');
  */
  const typeParams = fileType === 'all' ? '' : `type=${fileType}`;
  if (Object.keys(filters).length === 0) {
    filters = { formValues: {}, operators: {} };
  }
  filters.formValues.description = 'hot';
  filters.operators.description = FILTER_OPERATORS.LIKE;
  const params = compact([convertToQueryString(filters).slice(1), typeParams]).join('&');
  return dispatch(fetchAssets(paginationMetadata, `?${params}`));
};

export const makeFilter = (value, op = FILTER_OPERATORS.EQUAL) => ({ value, op });

export const applyAssetsFilter = (
  filters,
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const { sorting } = getListFilterParams(getState());
  const filter = Object.entries(filters).reduce((curr, [key, entry]) => ({
    formValues: {
      ...curr.formValues,
      [key]: entry.value,
    },
    operators: {
      ...curr.operators,
      [key]: entry.op,
    },
    sorting: curr.sorting,
  }), { formValues: {}, operators: {}, sorting });

  dispatch(setListFilterParams(filter));
  return dispatch(fetchAssetsPaged(paginationMetadata));
};

export const sortAssetsList = (
  attribute,
  direction = SORT_DIRECTIONS.ASCENDANT,
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const newSorting = { attribute, direction };
  const { sorting, ...others } = getListFilterParams(getState());

  if (sorting && sorting.attribute === attribute) {
    newSorting.direction = sorting.direction === 'ASC' ? 'DESC' : 'ASC';
  } else {
    newSorting.direction = 'ASC';
  }

  const filter = {
    ...others,
    sorting: newSorting,
  };

  dispatch(setListFilterParams(filter));
  return dispatch(fetchAssetsPaged(paginationMetadata));
};

export const sendDeleteAsset = id => dispatch => new Promise((resolve) => {
  deleteAsset(id)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchAssetsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendPostAssetEdit = ({ id, ...others }, file) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('editasset'));
  const { filename, ...info } = others;
  const formdata = new FormData();
  if (file) {
    formdata.append('file', new File([file], filename, { type: 'image/png', lastModified: new Date() }));
  }
  editAsset(id, formdata, `?${new URLSearchParams(info).toString()}`)
    .then((response) => {
      response.json().then((json) => {
        dispatch(toggleLoading('editasset'));
        if (response.ok) {
          dispatch(setAssetChanged(json.payload));
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});
