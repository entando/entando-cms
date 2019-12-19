import { makeRequest, METHODS } from '@entando/apimanager';
import { VIEWPAGES_PAYLOAD, SEARCH_PAGES } from 'testutils/mocks/pages';

export const getViewPages = () => makeRequest({
  uri: '/api/pages/viewpages',
  method: METHODS.GET,
  mockResponse: VIEWPAGES_PAYLOAD,
  contentType: 'application/json',
  useAuthentication: true,
});

export const putPageWidget = (pageCode, frameId, configItem) => makeRequest({
  uri: `/api/pages/${pageCode}/widgets/${frameId}`,
  method: METHODS.PUT,
  body: configItem,
  mockResponse: configItem,
  useAuthentication: true,
});

export const getSearchPages = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest(
  {
    uri: `/api/pages/search${params}`,
    method: METHODS.GET,
    useAuthentication: true,
    mockResponse: SEARCH_PAGES,
  },
  page,
);
