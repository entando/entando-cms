import { toggleLoading } from 'state/loading/actions';
import {
  getContents, deleteContent, publishContent, updateContents, publishMultipleContents,
} from 'api/contents';
import { setPage } from 'state/pagination/actions';
import { getPagination } from 'state/pagination/selectors';
import {
  getContentType, getGroup, getFilteringCategories,
  getStatusChecked, getAccessChecked, getAuthorChecked, getCurrentQuickFilter,
  getSortingColumns, getCurrentAuthorShow, getCurrentStatusShow, getTabSearchEnabled,
} from 'state/contents/selectors';
import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import {
  SET_CONTENTS, SET_QUICK_FILTER, SET_CONTENT_CATEGORY_FILTER,
  CHECK_STATUS, CHECK_ACCESS, CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW,
  SET_CURRENT_STATUS_SHOW, SET_CURRENT_COLUMNS_SHOW, SET_SORT, SET_CONTENT_TYPE, SET_TAB_SEARCH,
  SET_GROUP, SELECT_ROW, SELECT_ALL_ROWS, SET_JOIN_CONTENT_CATEGORY, RESET_JOIN_CONTENT_CATEGORIES,
} from 'state/contents/types';
import { postAddContent } from 'api/editContent';

const pageDefault = { page: 1, pageSize: 10 };

export const setContents = contents => ({
  type: SET_CONTENTS,
  payload: contents,
});

export const setTabSearch = tabSearch => ({
  type: SET_TAB_SEARCH,
  payload: tabSearch,
});

export const setQuickFilter = quickFilter => ({
  type: SET_QUICK_FILTER,
  payload: quickFilter,
});

export const setContentType = contentType => ({
  type: SET_CONTENT_TYPE,
  payload: contentType,
});

export const setGroup = group => ({
  type: SET_GROUP,
  payload: group,
});

export const setSort = sort => ({
  type: SET_SORT,
  payload: sort,
});

export const setContentCategoryFilter = category => ({
  type: SET_CONTENT_CATEGORY_FILTER,
  payload: category,
});

export const setJoinContentCategory = category => ({
  type: SET_JOIN_CONTENT_CATEGORY,
  payload: category,
});

export const resetJoinContentCategories = () => ({
  type: RESET_JOIN_CONTENT_CATEGORIES,
});

export const checkStatus = status => ({
  type: CHECK_STATUS,
  payload: status,
});

export const checkAccess = status => ({
  type: CHECK_ACCESS,
  payload: status,
});

export const checkAuthor = author => ({
  type: CHECK_AUTHOR,
  payload: author,
});

export const setCurrentAuthorShow = author => ({
  type: SET_CURRENT_AUTHOR_SHOW,
  payload: author,
});

export const setCurrentStatusShow = status => ({
  type: SET_CURRENT_STATUS_SHOW,
  payload: status,
});

export const setCurrentColumnsShow = column => ({
  type: SET_CURRENT_COLUMNS_SHOW,
  payload: column,
});

export const selectRow = row => ({
  type: SELECT_ROW,
  payload: row,
});

export const selectAllRows = checked => ({
  type: SELECT_ALL_ROWS,
  payload: checked,
});

export const fetchContents = (page = pageDefault,
  params) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contents'));
  getContents(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContents(json.payload));
          dispatch(setPage(json.metaData, 'contents'));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(selectAllRows(false));
        dispatch(toggleLoading('contents'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentsWithFilters = (
  params, newPagination, newSort,
) => (dispatch, getState) => {
  const state = getState();
  const pagination = newPagination || getPagination(state, 'contents') || getPagination(state);
  const sortingColumns = getSortingColumns(state);
  const quickFilter = getCurrentQuickFilter(state);
  const { id, value: qfValue } = quickFilter;
  const columnKey = Object.keys(sortingColumns)[0];
  const sortDirection = sortingColumns[columnKey].direction;
  const sortParams = newSort || `sort=${columnKey}&direction=${sortDirection.toUpperCase()}`;
  let filterParams = '';
  const filters = [];
  if (params) { filterParams = params; return dispatch(fetchContents(pagination, `${params}&${sortParams}`)); }
  if (qfValue) {
    filters.push({ att: id, value: qfValue });
  } else {
    const contentType = getContentType(state);
    const group = getGroup(state);
    const filteringCategories = getFilteringCategories(state);
    const status = getStatusChecked(state) || getCurrentStatusShow(state);
    const access = getAccessChecked(state);
    const author = getAuthorChecked(state) || getCurrentAuthorShow(state);
    if (contentType) filters.push({ att: 'typeCode', value: contentType });
    if (group) filters.push({ att: 'mainGroup', value: group });
    if (status) filters.push({ att: 'status', value: status });
    if (access) filters.push({ att: 'access', value: access === 'free' ? 'free' : 'closed' });
    if (author && author !== 'all') filters.push({ att: 'firstEditor', value: author });
    if (filteringCategories && filteringCategories.length) filters.push({ att: 'categories', value: filteringCategories });
  }
  filterParams = filters.map(({ att, value }, i) => {
    if (att === 'categories') {
      return value.map(
        (filter, j) => `&filters[${i + j}].attribute=categories&filters[${i + j}].value=${filter.code}`,
      ).join('');
    }
    if (att === 'status' && value === 'published') {
      return '&status=published';
    }
    return `&filters[${i}].attribute=${att}&filters[${i}].value=${value}`;
  }).join('');
  return dispatch(fetchContents(pagination, `?${sortParams}${filterParams}`));
};

export const fetchContentsWithTabs = (
) => (dispatch, getState) => {
  const state = getState();
  const pagination = getPagination(state, 'contents') || getPagination(state);
  const sortingColumns = getSortingColumns(state);
  const columnKey = Object.keys(sortingColumns)[0];
  const sortDirection = sortingColumns[columnKey].direction;
  const sortParams = `sort=${columnKey}&direction=${sortDirection.toUpperCase()}`;
  const author = getCurrentAuthorShow(state);
  const status = getCurrentStatusShow(state);
  const statusParams = status === 'published' ? '&status=published' : `&filters[0].attribute=status&filters[0].value=${status}`;
  const authorParams = author === 'all' ? '' : `&filters[0].attribute=author&filters[1].value=${author}`;
  return dispatch(fetchContents(pagination, `?${sortParams}${statusParams}${authorParams}`));
};

export const fetchContentsPaged = (params, page, sort, tabSearch) => (dispatch, getState) => {
  const state = getState();
  const tabSearchEnabled = tabSearch == null ? getTabSearchEnabled(state) : tabSearch;
  if (tabSearchEnabled) {
    return dispatch(fetchContentsWithTabs());
  }
  return dispatch(fetchContentsWithFilters(params, page, sort));
};

export const sendDeleteContent = id => dispatch => new Promise((resolve) => {
  deleteContent(id)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendPublishContent = (id, status) => dispatch => new Promise((resolve) => {
  publishContent(id, status)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendPublishMultipleContents = (id, status) => dispatch => new Promise((resolve) => {
  publishMultipleContents(id, status)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendUpdateContents = contents => dispatch => new Promise((resolve) => {
  updateContents(contents)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendCloneContent = content => dispatch => new Promise((resolve) => {
  postAddContent(content)
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
    .catch(() => {});
});
