import {
  addToast, addErrors, TOAST_ERROR, clearErrors,
} from '@entando/messages';

import {
  getVersionings, getSingleVersioning,
  restoreVersion, deleteVersion, getContentDetails,
} from 'api/versioning';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getCurrentPage, getPageSize } from 'state/pagination/selectors';

import {
  SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE,
  SET_SINGLE_CONTENT_VERSION_DETAILS,
} from 'state/versioning/types';
import { getSelectedVersioningType } from 'state/versioning/selectors';


export const setVersionings = versionings => ({
  type: SET_VERSIONINGS,
  payload: {
    versionings,
  },
});

export const setSelectedVersioningType = versioningType => ({
  type: SET_SELECTED_VERSIONING_TYPE,
  payload: versioningType,
});

export const setDetailedContentVersion = contentVersion => ({
  type: SET_SINGLE_CONTENT_VERSION_DETAILS,
  payload: contentVersion,
});

// thunks
export const fetchVersionings = (page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('versionings'));
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);
    getVersionings(selectedVersioningType, page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setVersionings(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('versionings'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const removeVersion = versionId => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);

    const page = getCurrentPage(state);
    const pageSize = getPageSize(state);

    deleteVersion(selectedVersioningType, versionId)
      .then(async (response) => {
        const json = await response.json();

        if (response.ok) {
          dispatch(fetchVersionings({ page, pageSize }));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve();
      })
      .catch(() => {});
  })
);

export const recoverVersion = (versionTypeId, versionNumber) => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);

    const page = getCurrentPage(state);
    const pageSize = getPageSize(state);

    restoreVersion(selectedVersioningType, versionTypeId, versionNumber)
      .then(async (response) => {
        const json = await response.json();

        if (response.ok) {
          dispatch(fetchVersionings({ page, pageSize }));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve();
      });
  }).catch(() => {})
);

export const fetchSingleVersioningHistory = (id, page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('versionings'));
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);
    getSingleVersioning(selectedVersioningType, id, page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setVersionings(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('versionings'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchContentDetails = (contentId, versionId) => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('contentVersionDetails'));
    getContentDetails(contentId, versionId).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDetailedContentVersion(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('contentVersionDetails'));
        resolve();
      });
    }).catch(() => {});
  })
);
