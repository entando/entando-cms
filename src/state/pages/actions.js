import { addErrors } from '@entando/messages';
import { getViewPages, getSearchPages } from 'api/pages';
import { SET_VIEWPAGES, SEARCH_PAGES } from 'state/pages/types';

export const setViewPages = pages => ({
  type: SET_VIEWPAGES,
  payload: pages,
});

export const setSearchPages = pages => ({
  type: SEARCH_PAGES,
  payload: {
    pages,
  },
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

export const fetchSearchPages = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  getSearchPages(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setSearchPages(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});
