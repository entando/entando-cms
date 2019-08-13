import { addErrors } from '@entando/messages';
import {
  SET_CONTENT_TYPES,
} from 'state/content-type/types';

import { getContentTypes } from 'api/contentTypes';

export const setContentTypeList = list => ({
  type: SET_CONTENT_TYPES,
  payload: { list },
});

export const fetchContentTypeListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  getContentTypes(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentTypeList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});
