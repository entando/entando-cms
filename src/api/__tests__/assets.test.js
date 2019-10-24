import { configEnzymeAdapter } from 'testutils/helpers';

import { getAssets } from 'api/assets';
import { makeRequest } from '@entando/apimanager';
import { GET_ASSETS_RESPONSE_OK } from 'testutils/mocks/assets';

configEnzymeAdapter();

jest.unmock('api/assets');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST' },
}));

describe('api/assets', () => {
  describe('assets', () => {
    it('returns a promise', () => {
      const response = getAssets();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/plugins/cms/assets',
        method: 'GET',
        mockResponse: GET_ASSETS_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      });
      expect(response).toBeInstanceOf(Promise);
    });
  });
});
