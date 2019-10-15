import {
  SET_CONTENT_SETTINGS,
  SET_EDITOR_SETTINGS,
  SET_METADATA_MAPPING,
} from 'state/content-settings/types';
import {
  getContentSettings,
  postReloadReferences,
  postReloadIndexes,
  putEditorSettings,
  postMetadataMap,
  putMetadataMap,
  deleteMetadataMap,
} from 'api/contentSettings';
import { getMetadataMappingFormData } from 'state/content-settings/selectors';
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

export const setMetadataMapping = payload => ({
  type: SET_METADATA_MAPPING,
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

export const sendPostMetadataMap = (key, mapping) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('postMetadataMap'));
  postMetadataMap({ key, mapping }).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setMetadataMapping(json.payload));
        resolve(json);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        resolve();
      }
      dispatch(toggleLoading('postMetadataMap'));
    });
  }).catch(() => {});
});

export const sendPutMetadataMap = (key, mapping) => dispatch => new Promise((resolve) => {
  putMetadataMap(key, mapping).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setMetadataMapping(json.payload));
        resolve({ key, json });
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        resolve({ key });
      }
    });
  }).catch(() => {});
});

export const checkAndPutMetadataMap = values => (dispatch, getState) => new Promise((resolve) => {
  const prevValues = getMetadataMappingFormData(getState());
  const proms = [];
  Object.entries(values).forEach(([key, mapping]) => {
    if (prevValues[key] !== mapping) {
      dispatch(toggleLoading(key));
      proms.push(
        dispatch(sendPutMetadataMap(key, mapping))
          .then((res) => {
            dispatch(toggleLoading(res.key));
            return res.json || null;
          }),
      );
    }
  });
  Promise.all(proms).then(payloads => resolve(payloads));
});

export const sendDeleteMetadataMap = key => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('deleteMetadataMap'));
  deleteMetadataMap(key).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setMetadataMapping(json.payload));
        resolve(json);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        resolve();
      }
      dispatch(toggleLoading('deleteMetadataMap'));
    });
  }).catch(() => {});
});
