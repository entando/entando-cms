import { addErrors } from '@entando/messages';
import {
  SET_CONTENT_MODELS,
} from 'state/content-model/types';

import { getContentModels } from 'api/contentModels';
import { toggleLoading } from 'state/loading/actions';

export const setContentModelList = list => ({
  type: SET_CONTENT_MODELS,
  payload: { list },
});

export const fetchContentModelListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentModelList'));
  getContentModels(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentModelList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('contentModelList'));
      resolve();
    });
  }).catch(() => {});
});
