import { configEnzymeAdapter } from 'testutils/helpers';

import { getContentTypes } from 'api/contentTypes';
import { makeRequest } from '@entando/apimanager';
import { GET_CONTENT_TYPES_RESPONSE_OK } from 'testutils/mocks/contentType';

configEnzymeAdapter();

jest.unmock('api/contentTypes');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise((resolve) => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/contentTypes', () => {
  it('returns a promise', () => {
    const response = getContentTypes();
    expect(makeRequest).toHaveBeenCalledWith(
      {
        uri: '/api/plugins/cms/contentTypes',
        method: 'GET',
        mockResponse: GET_CONTENT_TYPES_RESPONSE_OK,
        contentType: 'application/json',
        useAuthentication: true,
      },
      { page: 1, pageSize: 10 },
    );
    expect(response).toBeInstanceOf(Promise);
  });
});
