import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';

import { getContent, getGroups, postAddContent } from 'api/editContent';
import {
  SET_CONTENT_ENTRY, SET_OWNER_GROUP_DISABLE, SET_GROUPS, SET_WORK_MODE,
} from './types';

export const setContentEntry = content => ({
  type: SET_CONTENT_ENTRY,
  payload: { content },
});

export const fetchContent = params => dispatch => new Promise((resolve) => {
  getContent(params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentEntry(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const setOwnerGroupDisable = disabled => ({
  type: SET_OWNER_GROUP_DISABLE,
  payload: { disabled },
});

export const setWorkMode = mode => ({
  type: SET_WORK_MODE,
  payload: mode,
});

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: { groups },
});

export const fetchGroups = params => dispatch => new Promise((resolve) => {
  getGroups(params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setGroups(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

// eslint-disable-next-line
export const sendPostAddContent = contModelObject => dispatch => new Promise(resolve => postAddContent(contModelObject)
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
  .catch(() => {}));
