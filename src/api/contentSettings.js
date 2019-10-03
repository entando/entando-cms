import { makeRequest, METHODS } from '@entando/apimanager';
import {
  CONTENT_SETTINGS_OK,
  CONTENT_SETTINGS_REFRESH_OK,
  CONTENT_SETTINGS_EDITOR_OK,
  CONTENT_SETTINGS_CROP_RATIOS_OK,
} from 'testutils/mocks/contentSettings';

const settingsPath = '/api/plugins/cms/contentSettings';

export const getContentSettings = () => (
  makeRequest({
    uri: settingsPath,
    method: METHODS.GET,
    mockResponse: CONTENT_SETTINGS_OK,
    useAuthentication: true,
  })
);

export const postReloadIndexes = () => (
  makeRequest({
    uri: `${settingsPath}/reloadIndexes`,
    method: METHODS.POST,
    body: {},
    mockResponse: CONTENT_SETTINGS_REFRESH_OK,
    useAuthentication: true,
  })
);

export const postReloadReferences = () => (
  makeRequest({
    uri: `${settingsPath}/reloadReferences`,
    method: METHODS.POST,
    body: {},
    mockResponse: CONTENT_SETTINGS_REFRESH_OK,
    useAuthentication: true,
  })
);

export const putEditorSettings = editorObject => (
  makeRequest({
    uri: `${settingsPath}/editor`,
    body: editorObject,
    method: METHODS.PUT,
    mockResponse: CONTENT_SETTINGS_EDITOR_OK,
    useAuthentication: true,
  })
);

export const postCropRatio = params => (
  makeRequest({
    uri: `${settingsPath}/cropRatios`,
    body: params,
    method: METHODS.POST,
    mockResponse: CONTENT_SETTINGS_CROP_RATIOS_OK,
    useAuthentication: true,
  })
);
