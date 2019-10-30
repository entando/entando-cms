import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_ASSETS_RESPONSE_OK } from 'testutils/mocks/assets';

const getAssetsPath = '/api/plugins/cms/assets';

export const getAssets = (params = '') => makeRequest({
  uri: `${getAssetsPath}${params}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: GET_ASSETS_RESPONSE_OK,
  useAuthentication: true,
});

export const editAsset = (id, file, params = '') => makeRequest({
  uri: `${getAssetsPath}/${id}${params}`,
  body: { file },
  method: METHODS.POST,
  mockResponse: GET_ASSETS_RESPONSE_OK,
  useAuthentication: true,
});
