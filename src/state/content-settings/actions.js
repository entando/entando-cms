import {
  SET_CONTENT_SETTINGS,
  SET_EDITOR_SETTINGS,
  SET_CROP_RATIOS,
} from 'state/content-settings/types';
import {
  getContentSettings,
  postReloadReferences,
  postReloadIndexes,
  putEditorSettings,
  postCropRatio,
} from 'api/contentSettings';
import { toggleLoading } from 'state/loading/actions';
import {
  addErrors,
  addToast,
  clearErrors,
  TOAST_ERROR,
} from '@entando/messages';


export const setContentSettings = payload => ({
  type: SET_CONTENT_SETTINGS,
  payload,
});

export const setEditorSettings = payload => ({
  type: SET_EDITOR_SETTINGS,
  payload,
});

export const setCropRatios = payload => ({
  type: SET_CROP_RATIOS,
  payload,
});

// thunks

export const fetchContentSettings = () => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('getSettings'));
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
      dispatch(toggleLoading('getSettings'));
    });
  }).catch(() => {});
});

export const sendPostReloadReferences = () => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('reloadReferences'));
    postReloadReferences().then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('reloadReferences'));
        resolve();
      });
    });
  })
);

export const sendPostReloadIndexes = () => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('reloadIndexes'));
    postReloadIndexes().then((response) => {
      response.json().then((json) => {
        dispatch(toggleLoading('reloadIndexes'));
        if (response.ok) {
          dispatch(fetchContentSettings());
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

export const sendPutEditorSettings = editor => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('putEditorSettings'));
  putEditorSettings(editor).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setEditorSettings(json.payload));
        resolve(json);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        resolve();
      }
      dispatch(toggleLoading('putEditorSettings'));
    });
  }).catch(() => {});
});

export const addCropRatio = cropRatio => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('addCropRatio'));

  const params = { ratio: cropRatio };
  postCropRatio(params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setCropRatios(json.payload));
        resolve(json);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        resolve();
      }

      dispatch(toggleLoading('addCropRatio'));
    });
  }).catch(() => {});
});
