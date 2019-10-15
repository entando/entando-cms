import {
  configEnzymeAdapter,
} from 'testutils/helpers';

import {
  getContentSettings,
  postReloadIndexes,
  postReloadReferences,
  putEditorSettings,
  postMetadataMap,
  putMetadataMap,
  deleteMetadataMap,
} from 'api/contentSettings';
import { makeRequest } from '@entando/apimanager';
import {
  CONTENT_SETTINGS_OK,
  CONTENT_SETTINGS_REFRESH_OK,
  CONTENT_SETTINGS_EDITOR_OK,
  CONTENT_SETTINGS_METADATA_OK,
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

  it('postMetadataMap returns a promise with correct params', () => {
    const param = 1;
    const response = postMetadataMap(param);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentSettings/metadata',
      method: 'POST',
      body: param,
      mockResponse: CONTENT_SETTINGS_METADATA_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('putMetadataMap returns a promise with correct params', () => {
    const key = 'wa';
    const mapping = 'kanda';
    const response = putMetadataMap(key, mapping);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: `/api/plugins/cms/contentSettings/metadata/${key}`,
      method: 'PUT',
      body: { mapping },
      mockResponse: CONTENT_SETTINGS_METADATA_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });

  it('deleteMetadataMap returns a promise with correct params', () => {
    const mapping = 1;
    const response = deleteMetadataMap(mapping);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: `/api/plugins/cms/contentSettings/metadata/${mapping}`,
      method: 'DELETE',
      mockResponse: CONTENT_SETTINGS_METADATA_OK,
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
