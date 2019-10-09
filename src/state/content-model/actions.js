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
} from 'state/content-model/types';

import {
  getContentModels,
  postContentModel,
  getContentModel,
  putContentModel,
  deleteContentModel,
} from 'api/contentModels';
import { getContentModelFilters } from 'state/content-model/selectors';
import { toggleLoading } from 'state/loading/actions';

export const setContentModelList = list => ({
  type: SET_CONTENT_MODELS,
  payload: { list },
});

export const setContentModel = payload => ({
  type: SET_CONTENT_MODEL_OPENED,
  payload,
});

export const setSearchFilter = payload => ({
  type: SET_CONTENT_MODEL_FILTER,
  payload,
});

const pageDefault = { page: 1, pageSize: 10 };

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
  const filters = getContentModelFilters(getState());
  return dispatch(fetchContentModelList(paginationMetadata, convertToQueryString(filters)));
};

const applyContentModelFilter = (
  filter,
  paginationMetadata = pageDefault,
) => (dispatch) => {
  dispatch(setSearchFilter(filter));
  return dispatch(fetchContentModelListPaged(paginationMetadata));
};

export const filterContentModelBySearch = (
  keyword,
  paginationMetadata = pageDefault,
  field = 'descr',
  operator = FILTER_OPERATORS.LIKE,
) => {
  const filter = {
    formValues: { [field]: keyword },
    operators: { [field]: operator },
  };
  return applyContentModelFilter(filter, paginationMetadata);
};

export const fetchContentModelsByContentType = (contentType, paginationMetadata = pageDefault) => (
  filterContentModelBySearch(contentType, paginationMetadata, 'contentType', FILTER_OPERATORS.EQUAL)
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
