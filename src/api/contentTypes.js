import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENT_TYPES_RESPONSE_OK } from 'testutils/mocks/contentType';

const contentTypePath = '/api/plugins/cms/contentTypes';

// eslint-disable-next-line import/prefer-default-export
export const getContentTypes = (page = { page: 1, pageSize: 10 }, params = '') =>
  makeRequest(
    {
      uri: `${contentTypePath}${params}`,
      method: METHODS.GET,
      mockResponse: GET_CONTENT_TYPES_RESPONSE_OK,
      contentType: 'application/json',
      useAuthentication: true,
    },
    page,
  );
