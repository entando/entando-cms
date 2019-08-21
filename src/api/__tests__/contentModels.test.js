import {
  configEnzymeAdapter,
} from 'testutils/helpers';

import { getContentModels, postContentModel } from 'api/contentModels';
import { makeRequest } from '@entando/apimanager';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';

configEnzymeAdapter();

jest.unmock('api/contentModels');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST' },
}));

describe('api/contentModels', () => {
  it('getContentModels returns a promise with correct params', () => {
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

  it('postContentModel returns a promise with correct params', () => {
    const body = { a: 1, b: 2 };
    const response = postContentModel({ a: 1, b: 2 });
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/plugins/cms/contentmodels',
      body,
      method: 'POST',
      mockResponse: GET_CONTENT_MODELS_RESPONSE_OK[0],
      useAuthentication: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
