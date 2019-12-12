import { addErrors } from '@entando/messages';

import { getViewPages } from 'api/pages';
import { SET_VIEWPAGES } from 'state/pages/types';

export const setViewPages = pages => ({
  type: SET_VIEWPAGES,
  payload: pages,
});

export const fetchViewPages = () => dispatch => new Promise((resolve) => {
  getViewPages().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setViewPages(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});
