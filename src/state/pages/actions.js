import { addErrors } from '@entando/messages';
import { flattenDeep } from 'lodash';

import {
  getPage, getPageChildren, getViewPages, getSearchPages,
} from 'api/pages';
import { toggleLoading } from 'state/loading/actions';
import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED,
  TOGGLE_PAGE_EXPANDED, SET_VIEWPAGES, SEARCH_PAGES,
  CLEAR_TREE, BATCH_TOGGLE_EXPANDED, COLLAPSE_ALL,
} from 'state/pages/types';
import { getStatusMap } from 'state/pages/selectors';

const HOMEPAGE_CODE = 'homepage';

const noopPromise = arg => new Promise(resolve => resolve(arg));

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

export const clearTree = () => ({
  type: CLEAR_TREE,
});

export const setBatchExpanded = pageCodes => ({
  type: BATCH_TOGGLE_EXPANDED,
  payload: pageCodes,
});

export const collapseAll = () => ({
  type: COLLAPSE_ALL,
});

const wrapApiCall = apiFunc => (...args) => dispatch => new Promise((resolve, reject) => {
  apiFunc(...args).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        resolve(json);
      }
      dispatch(addErrors(json.errors.map(e => e.message)));
      reject(json);
    });
  });
});


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

export const fetchPageTree = pageCode => dispatch => new Promise((resolve) => {
  if (pageCode === HOMEPAGE_CODE) {
    Promise.all([
      fetchPage(pageCode)(dispatch),
      fetchPageChildren(pageCode)(dispatch),
    ]).then((responses) => {
      resolve([responses[0].payload].concat(responses[1].payload));
    });
  }
  fetchPageChildren(pageCode)(dispatch).then((response) => {
    resolve(response.payload);
  });
});

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

export const fetchPageTreeAll = () => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('pageTree'));
  dispatch(clearTree());
  const fetchBranch = pageCode => (
    dispatch(fetchPageChildren(pageCode)).then(response => response.payload)
  );

  const loadChildrenBranch = pgArr => (
    Promise.all(pgArr.map((pg) => {
      if (pg.children.length > 0) {
        return fetchBranch(pg.code).then(res => (
          loadChildrenBranch(res)
        )).then(loadedres => (
          [pg, ...loadedres]
        ));
      }
      return Promise.resolve(pg);
    }))
  );
  dispatch(fetchPage(HOMEPAGE_CODE)).then((rootPg) => {
    fetchBranch(HOMEPAGE_CODE).then((catResult) => {
      loadChildrenBranch(catResult).then((fullResult) => {
        const allPages = [rootPg.payload, ...flattenDeep(fullResult)];
        dispatch(addPages(allPages));
        dispatch(setBatchExpanded(allPages.map(p => p.code)));
        dispatch(toggleLoading('pageTree'));
        resolve(allPages);
      });
    });
  }).catch(() => {});
});
