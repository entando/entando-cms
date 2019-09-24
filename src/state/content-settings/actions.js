import { SET_CONTENT_SETTINGS } from 'state/content-settings/types';
import { getContentSettings, postReloadReferences } from 'api/contentSettings';
import {
  addErrors,
  addToast,
  clearErrors,
  TOAST_ERROR,
  TOAST_SUCCESS,
} from '@entando/messages';


export const setContentSettings = payload => ({
  type: SET_CONTENT_SETTINGS,
  payload,
});

export const fetchContentSettings = () => dispatch => new Promise(resolve => (
  getContentSettings().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentSettings(json.payload));
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(clearErrors());
        resolve();
      }
    });
  }).catch(() => {})
));

export const sendPostReloadReferences = () => dispatch => (
  new Promise((resolve) => {
    postReloadReferences().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast(json.payload.status, TOAST_SUCCESS));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve();
      });
    });
  })
);
