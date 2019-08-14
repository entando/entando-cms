import {
  addErrors,
  addToast,
  clearErrors,
  TOAST_ERROR,
} from '@entando/messages';
import {
  SET_CONTENT_MODELS,
} from 'state/content-model/types';

import { getContentModels, postContentModel } from 'api/contentModels';

export const setContentModelList = list => ({
  type: SET_CONTENT_MODELS,
  payload: { list },
});

export const fetchContentModelListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  getContentModels(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentModelList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});

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
