import { addErrors } from '@entando/messages';

import {
  getPage, getPageChildren, getViewPages,
} from 'api/pages';
import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED,
  TOGGLE_PAGE_EXPANDED, SET_VIEWPAGES,
} from 'state/pages/types';
import { getStatusMap } from 'state/pages/selectors';

const HOMEPAGE_CODE = 'homepage';

const noopPromise = arg => new Promise(resolve => resolve(arg));

export const setViewPages = pages => ({
  type: SET_VIEWPAGES,
  payload: pages,
});

export const setPageLoading = pageCode => ({
  type: SET_PAGE_LOADING,
  payload: {
    pageCode,
  },
});

export const addPages = pages => ({
  type: ADD_PAGES,
  payload: {
    pages,
  },
});

export const togglePageExpanded = (pageCode, expanded) => ({
  type: TOGGLE_PAGE_EXPANDED,
  payload: {
    pageCode,
    expanded,
  },
});

export const setPageLoaded = pageCode => ({
  type: SET_PAGE_LOADED,
  payload: {
    pageCode,
  },
});

const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  dispatch(addErrors(json.errors.map(e => e.message)));
  throw json;
};


export const fetchPage = wrapApiCall(getPage);
export const fetchPageChildren = wrapApiCall(getPageChildren);

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

export const fetchPageTree = pageCode => async (dispatch) => {
  if (pageCode === HOMEPAGE_CODE) {
    const responses = await Promise.all([
      fetchPage(pageCode)(dispatch),
      fetchPageChildren(pageCode)(dispatch),
    ]);
    return [responses[0].payload].concat(responses[1].payload);
  }
  const response = await fetchPageChildren(pageCode)(dispatch);
  return response.payload;
};

export const handleExpandPage = (pageCode = HOMEPAGE_CODE) => (dispatch, getState) => {
  const pageStatus = getStatusMap(getState())[pageCode];
  const toExpand = (!pageStatus || !pageStatus.expanded);
  const toLoad = (toExpand && (!pageStatus || !pageStatus.loaded));
  if (toLoad) {
    dispatch(setPageLoading(pageCode));
    return fetchPageTree(pageCode)(dispatch)
      .then((pages) => {
        dispatch(addPages(pages));
        dispatch(togglePageExpanded(pageCode, true));
        dispatch(setPageLoaded(pageCode));
      }).catch(() => {});
  }
  dispatch(togglePageExpanded(pageCode, toExpand));
  return noopPromise();
};
