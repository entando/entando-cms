import {
  addErrors,
  addToast,
  TOAST_ERROR,
  clearErrors,
} from '@entando/messages';
import moment from 'moment';
import { formValueSelector } from 'redux-form';
import _, { compact } from 'lodash';
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
  SET_ASSET_SEARCH_KEYWORD,
  RESET_FILTERING_CATEGORIES,
  SET_ASSET_COUNT,
} from 'state/assets/types';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import {
  getFileType,
  getListFilterParams,
  getAssetsMap,
} from 'state/assets/selectors';
import {
  getAssets, createAsset, editAsset, deleteAsset, cloneAsset,
} from 'api/assets';
import { getPagination } from 'state/pagination/selectors';

export const resetFilteringCategories = () => ({
  type: RESET_FILTERING_CATEGORIES,
});

export const setAssetCategoryFilter = category => ({
  type: SET_ASSET_CATEGORY_FILTER,
  payload: category,
});

export const setAssetsCount = (type, count) => ({
  type: SET_ASSET_COUNT,
  payload: { type, count },
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

export const setSearchKeyword = payload => ({
  type: SET_ASSET_SEARCH_KEYWORD,
  payload,
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
    .catch(() => { });
});

export const fetchAssetsCount = type => dispatch => new Promise((resolve) => {
  getAssets({ page: 1, pageSize: 0 }, `?type=${type}`)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setAssetsCount(type, json.metaData && json.metaData.totalItems
            ? json.metaData.totalItems : 0));
        }
        resolve();
      });
    })
    .catch(() => { });
});

export const fetchAssetsPaged = (
  paginationMetadata = pageDefault,
  assetType = null,
) => (dispatch, getState) => {
  const state = getState();
  const fileType = assetType || getFileType(state);
  let filters = getListFilterParams(state);
  const typeParams = fileType === 'all' ? '' : `type=${fileType}`;
  if (filters && Object.keys(filters).length === 0) {
    filters = { formValues: {}, operators: {} };
  }
  const categoryFilterExists = filters.formValues && filters.formValues.categories;
  let categoryParams = '';
  const newFilters = _.cloneDeep(filters);
  if (categoryFilterExists) {
    let { categories } = filters.formValues;
    delete newFilters.formValues.categories;
    if (!Array.isArray(categories)) {
      categories = [categories];
    }
    const startIndex = Object.keys(newFilters.formValues || []).length;
    categoryParams = categories.map(
      (c, i) => `&filters[${i + startIndex}].attribute=categories&filters[${i + startIndex}].value=${c}`,
    ).join('');
  }

  const params = compact([convertToQueryString(newFilters).slice(1), typeParams, categoryParams]).join('&');
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
  const page = getPagination(getState()) || paginationMetadata;
  return dispatch(fetchAssetsPaged(page));
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
  const page = getPagination(getState()) || paginationMetadata;
  return dispatch(fetchAssetsPaged(page));
};

export const filterAssetsBySearch = (
  keyword,
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const filt = getListFilterParams(getState());
  const { formValues, operators, sorting } = filt;
  const filters = { formValues, operators, sorting };
  if (!formValues) {
    filters.formValues = {};
    filters.operators = {};
  }
  if (keyword) {
    filters.formValues.description = keyword;
    filters.operators.description = FILTER_OPERATORS.LIKE;
  } else {
    delete formValues.description;
    delete operators.description;
  }
  dispatch(setSearchKeyword(keyword));
  dispatch(setListFilterParams(filters));
  const page = getPagination(getState()) || paginationMetadata;
  const params = compact([convertToQueryString(filters).slice(1)]).join('&').replace('toDateTimeString', 'createdAt');
  return dispatch(fetchAssets(page, `?${params}`));
};

export const advancedSearchFilter = (
  values, paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const state = getState();
  const filt = getListFilterParams(state);
  const { formValues = {}, operators = {}, sorting } = filt;
  const fileType = getFileType(state);
  const typeParams = fileType === 'all' ? '' : `type=${fileType}`;
  const filters = { formValues, operators, sorting };
  const keyword = formValueSelector('assetSearchForm')(state, 'keyword');

  if (keyword) {
    filters.formValues.description = keyword;
    filters.operators.description = FILTER_OPERATORS.LIKE;
  } else {
    delete filters.formValues.description;
    delete filters.operators.description;
  }
  const {
    group, owner, fromDate, toDate,
  } = values;
  const getDateTime = date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD-hh.mm.ss');
  const valuesFilters = {
    ...(toDate && {
      toDateTimeString: {
        value: getDateTime(toDate),
        op: FILTER_OPERATORS.LESS_THAN,
      },
    }),
    ...(group && {
      group: {
        value: group,
        op: FILTER_OPERATORS.EQUAL,
      },
    }),
    ...(owner && {
      owner: {
        value: owner,
        op: FILTER_OPERATORS.LIKE,
      },
    }),
    ...(fromDate && {
      createdAt: {
        value: getDateTime(fromDate),
        op: FILTER_OPERATORS.GREATER_THAN,
      },
    }),
  };
  Object.keys(valuesFilters).map((key) => {
    const val = valuesFilters[key];
    filters.formValues[key] = {};
    filters.formValues[key] = val.value;
    filters.operators[key] = val.op;
    return null;
  });
  dispatch(setListFilterParams(filters));
  const params = compact([convertToQueryString(filters).slice(1), typeParams]).join('&').replace('toDateTimeString', 'createdAt');
  return dispatch(fetchAssets(paginationMetadata, `?${params}`));
};

export const sendDeleteAsset = id => dispatch => new Promise((resolve) => {
  deleteAsset(id)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchAssetsPaged());
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => { });
});

export const sendPostAssetEdit = ({ id, ...others }, file) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('editasset'));
  const { filename, ...info } = others;
  const formdata = new FormData();
  if (file) {
    formdata.append('file', new File([file], filename, { type: 'image/png', lastModified: new Date() }));
  }
  formdata.append('metadata', JSON.stringify(info));
  editAsset(id, formdata)
    .then((response) => {
      response.json().then((json) => {
        dispatch(toggleLoading('editasset'));
        if (response.ok) {
          dispatch(setAssetChanged(json.payload));
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => { });
});

export const sendUploadAsset = file => dispatch => new Promise((resolve) => {
  const {
    fileObject, group, categories, filename,
  } = file;
  const type = fileObject.type.startsWith('image') ? 'image' : 'file';
  const namedFile = new File([fileObject], filename, { type: fileObject.type });
  const formData = new FormData();
  formData.append('file', namedFile);
  formData.append('metadata', JSON.stringify({
    group, categories, type,
  }));

  createAsset(
    formData,
  )
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchAssetsPaged());
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch((error) => {
      resolve({ error, hasError: true });
    });
});

export const fetchRawAssetInfo = assetId => (dispatch, getState) => new Promise((resolve) => {
  const assetsMap = getAssetsMap(getState());
  resolve(assetsMap[assetId]);
});

export const sendCloneAsset = id => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('assets'));
  cloneAsset(id)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchAssetsPaged());
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading('assets'));
      });
    })
    .catch(() => { });
});
