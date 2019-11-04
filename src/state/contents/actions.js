import { toggleLoading } from 'state/loading/actions';
import {
  getContents, deleteContent, publishContent,
} from 'api/contents';
import { setPage } from 'state/pagination/actions';
import { getPagination } from 'state/pagination/selectors';
import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import {
  SET_CONTENTS, SET_QUICK_FILTER, SET_CONTENT_CATEGORY_FILTER,
  CHECK_STATUS, CHECK_ACCESS, CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW,
  SET_CURRENT_STATUS_SHOW, SET_CURRENT_COLUMNS_SHOW, SET_SORT, SET_CONTENT_TYPE,
  SET_GROUP, SELECT_ROW, SELECT_ALL_ROWS,
} from 'state/contents/types';

const pageDefault = { page: 1, pageSize: 10 };

export const setContents = contents => ({
  type: SET_CONTENTS,
  payload: contents,
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
        dispatch(toggleLoading('contents'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentsPaged = () => (dispatch, getState) => {
  const pagination = getPagination(getState());
  // @ TODO get filter properties and convert to query string and add as param
  return dispatch(fetchContents(pagination));
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
