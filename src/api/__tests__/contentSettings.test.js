import {
  configEnzymeAdapter,
} from 'testutils/helpers';

import {
  getContentSettings,
  postReloadIndexes,
  postReloadReferences,
  putEditorSettings,
  postCropRatio,
  deleteCropRatio,
} from 'api/contentSettings';
import { makeRequest } from '@entando/apimanager';
import {
  CONTENT_SETTINGS_OK,
  CONTENT_SETTINGS_REFRESH_OK,
  CONTENT_SETTINGS_EDITOR_OK,
  CONTENT_SETTINGS_CROP_RATIOS_OK,
} from 'testutils/mocks/contentSettings';

configEnzymeAdapter();

jest.unmock('api/contentSettings');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

describe('api/contentSettings', () => {
  it('getContentSettings returns a promise with correct params', () => {
    const response = getContentSettings();
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentSettings',
      method: 'GET',
      mockResponse: CONTENT_SETTINGS_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('postReloadIndexes returns a promise with correct params', () => {
    const response = postReloadIndexes();
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentSettings/reloadIndexes',
      method: 'POST',
      body: {},
      mockResponse: CONTENT_SETTINGS_REFRESH_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('postReloadReferences returns a promise with correct params', () => {
    const response = postReloadReferences();
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentSettings/reloadReferences',
      method: 'POST',
      body: {},
      mockResponse: CONTENT_SETTINGS_REFRESH_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('putEditorSettings returns a promise with correct params', () => {
    const param = { key: 1 };
    const response = putEditorSettings(param);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentSettings/editor',
      method: 'PUT',
      body: param,
      mockResponse: CONTENT_SETTINGS_EDITOR_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('postCropRatio returns a promise with correct params', () => {
    const cropRatio = '4:9';
    const response = postCropRatio(cropRatio);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentSettings/cropRatios',
      method: 'POST',
      body: { ratio: cropRatio },
      mockResponse: CONTENT_SETTINGS_CROP_RATIOS_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('deleteCropRatio returns a promise with correct params', () => {
    const cropRatio = '4:9';
    const response = deleteCropRatio(cropRatio);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: `/api/plugins/cms/contentSettings/cropRatios/${cropRatio}`,
      method: 'DELETE',
      mockResponse: CONTENT_SETTINGS_CROP_RATIOS_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
