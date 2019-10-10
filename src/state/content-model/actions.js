import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import {
  addErrors,
  addToast,
  clearErrors,
  TOAST_ERROR,
} from '@entando/messages';
import { setPage } from 'state/pagination/actions';
import {
  SET_CONTENT_MODELS,
  SET_CONTENT_MODEL_OPENED,
  SET_CONTENT_MODEL_FILTER,
  SET_CONTENT_MODEL_SEARCH_ATTRIBUTE,
  SET_CONTENT_MODEL_SEARCH_KEYWORD,
} from 'state/content-model/types';

import {
  getContentModels,
  postContentModel,
  getContentModel,
  putContentModel,
  deleteContentModel,
} from 'api/contentModels';
import { getContentModelFilterProps, getContentModelSearchAttribute } from 'state/content-model/selectors';
import { toggleLoading } from 'state/loading/actions';

export const setContentModelList = list => ({
  type: SET_CONTENT_MODELS,
  payload: { list },
});

export const setContentModel = payload => ({
  type: SET_CONTENT_MODEL_OPENED,
  payload,
});

export const setListFilterProps = payload => ({
  type: SET_CONTENT_MODEL_FILTER,
  payload,
});

export const setSearchAttribute = payload => ({
  type: SET_CONTENT_MODEL_SEARCH_ATTRIBUTE,
  payload,
});

export const setSearchKeyword = payload => ({
  type: SET_CONTENT_MODEL_SEARCH_KEYWORD,
  payload,
});

export const pageDefault = { page: 1, pageSize: 10 };

// thunks

export const fetchContentModelList = (page = pageDefault, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentModelList'));
  getContentModels(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentModelList(json.payload));
        dispatch(setPage(json.metaData));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('contentModelList'));
      resolve();
    });
  }).catch(() => {});
});

export const fetchContentModelListPaged = (
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const filters = getContentModelFilterProps(getState());
  return dispatch(fetchContentModelList(paginationMetadata, convertToQueryString(filters)));
};

const applyContentModelFilter = (
  keyword,
  field = 'descr',
  paginationMetadata = pageDefault,
  operator = FILTER_OPERATORS.LIKE,
) => (dispatch) => {
  let filter = {};
  if (keyword) {
    filter = {
      formValues: { [field]: keyword },
      operators: { [field]: operator },
    };
  }
  dispatch(setSearchKeyword(keyword));
  dispatch(setListFilterProps(filter));
  return dispatch(fetchContentModelListPaged(paginationMetadata));
};

export const filterContentModelBySearch = (
  keyword,
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const field = getContentModelSearchAttribute(getState());
  return dispatch(applyContentModelFilter(keyword, field, paginationMetadata));
};

export const fetchContentModelsByContentType = (contentType, paginationMetadata = pageDefault) => (
  applyContentModelFilter(contentType, 'contentType', paginationMetadata, FILTER_OPERATORS.EQUAL)
);

export const sendPostContentModel = contModelObject => dispatch => new Promise(resolve => (
  postContentModel(contModelObject).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(clearErrors());
        resolve();
      }
    });
  }).catch(() => {})
));

export const fetchContentModel = id => dispatch => new Promise(resolve => (
  getContentModel(id).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentModel(json.payload));
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(clearErrors());
        resolve();
      }
    });
  }).catch(() => {})
));

export const sendPutContentModel = contModelObject => dispatch => new Promise(resolve => (
  putContentModel(contModelObject).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(clearErrors());
        resolve();
      }
    });
  }).catch(() => {})
));

export const sendDeleteContentModel = id => dispatch => new Promise(resolve => (
  deleteContentModel(id).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        resolve(json.payload);
        dispatch(fetchContentModelListPaged());
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(clearErrors());
        resolve();
      }
    });
  }).catch(() => {})
));
