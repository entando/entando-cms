import {
  addToast, addErrors, TOAST_ERROR, clearErrors,
} from '@entando/messages';

import {
  getVersionings, getSingleVersioning,
} from 'api/versioning';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
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

// thunk
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

export const fetchSingleVersioningHistory = (id, page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('singleVersioningHistory'));
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
        dispatch(toggleLoading('singleVersioningHistory'));
        resolve();
      });
    }).catch(() => {});
  })
);
