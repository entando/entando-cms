import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import { SET_CONTENT_MODELS, SET_CONTENT_MODEL_OPENED } from 'state/content-model/types';

import {
  getContentModels,
  postContentModel,
  getContentModel,
  putContentModel,
  deleteContentModel,
} from 'api/contentModels';
import { toggleLoading } from 'state/loading/actions';

export const setContentModelList = list => ({
  type: SET_CONTENT_MODELS,
  payload: { list },
});

export const setContentModel = payload => ({
  type: SET_CONTENT_MODEL_OPENED,
  payload,
});

export const fetchContentModelListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentModelList'));
  getContentModels(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentModelList(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('contentModelList'));
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostContentModel = contModelObject => dispatch => new Promise(
  resolve => postContentModel(contModelObject)
    .then((response) => {
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
    })
    .catch(() => {}),
);

export const fetchContentModel = id => dispatch => new Promise(resolve => getContentModel(id)
  .then((response) => {
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
  })
  .catch(() => {}));

export const sendPutContentModel = contModelObject => dispatch => new Promise(
  resolve => putContentModel(contModelObject)
    .then((response) => {
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
    })
    .catch(() => {}),
);

export const sendDeleteContentModel = id => dispatch => new Promise(
  resolve => deleteContentModel(id)
    .then((response) => {
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
    })
    .catch(() => {}),
);
