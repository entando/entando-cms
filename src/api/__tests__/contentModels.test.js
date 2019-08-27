import {
  configEnzymeAdapter,
} from 'testutils/helpers';

import { getContentModels } from 'api/contentModels';
import { makeRequest } from '@entando/apimanager';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';

configEnzymeAdapter();

jest.unmock('api/contentModels');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/contentModels', () => {
  it('returns a promise', () => {
    const response = getContentModels();
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentmodels',
      method: 'GET',
      mockResponse: GET_CONTENT_MODELS_RESPONSE_OK,
      contentType: 'application/json',
      useAuthentication: true,
      errors: expect.any(Function),
    },
    { page: 1, pageSize: 10 });
    expect(response).toBeInstanceOf(Promise);
  });
});
