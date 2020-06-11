import {
  addToast, addErrors, TOAST_ERROR, clearErrors,
} from '@entando/messages';

import {
  getVersionings,
  restoreVersion,
  deleteVersion,
} from 'api/versioning';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getCurrentPage, getPageSize } from 'state/pagination/selectors';

import { SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE } from './types';
import { getSelectedVersioningType } from './selectors';


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

// thunks
export const fetchVersionings = (page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('versionings'));
    /* @TODO Get filtering params here and pass it down as params below */
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
      })
      .catch(() => {});
  })
);
