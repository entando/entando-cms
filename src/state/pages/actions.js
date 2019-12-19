import { addErrors } from '@entando/messages';
import { getViewPages, getSearchPages } from 'api/pages';
import { setPage } from 'state/pagination/actions';
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

export const fetchSearchPages = (page = { page: 1, pageSize: 10 }, params = '') => async (dispatch) => {
  try {
    const response = await getSearchPages(page, params);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSearchPages(json.payload));
      dispatch(setPage(json.metaData));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
};
