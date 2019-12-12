import { makeRequest } from '@entando/apimanager';
import { VIEWPAGES_PAYLOAD } from 'testutils/mocks/pages';

// eslint-disable-next-line import/prefer-default-export
export const getViewPages = () => makeRequest({
  uri: '/api/pages/viewpages',
  method: 'GET',
  mockResponse: VIEWPAGES_PAYLOAD,
  contentType: 'application/json',
  useAuthentication: true,
});
