import { makeRequest } from '@entando/apimanager';

import { getViewPages } from 'api/pages';
import { VIEWPAGES_PAYLOAD } from 'testutils/mocks/pages';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

describe('api/pages', () => {
  describe('getViewPages', () => {
    it('should return a Promise returned by makeRequest', () => {
      expect(getViewPages()).toBeInstanceOf(Promise);
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/api/pages/viewpages',
          method: 'GET',
          mockResponse: VIEWPAGES_PAYLOAD,
          contentType: 'application/json',
          useAuthentication: true,
        },
      );
    });
  });
});
