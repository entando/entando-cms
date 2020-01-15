import { makeRequest, METHODS } from '@entando/apimanager';

import {
  HOMEPAGE_PAYLOAD, LOGIN_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  NOTFOUND_PAYLOAD, ERROR_PAYLOAD, DASHBOARD_PAYLOAD, VIEWPAGES_PAYLOAD,
  SEARCH_PAGES,
} from 'testutils/mocks/pages';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';

const fetchPageResponseMap = {
  homepage: HOMEPAGE_PAYLOAD,
  dashboard: DASHBOARD_PAYLOAD,
  login: LOGIN_PAYLOAD,
  service: SERVICE_PAYLOAD,
  notfound: NOTFOUND_PAYLOAD,
  error: ERROR_PAYLOAD,
  contacts: CONTACTS_PAYLOAD,
};

export const getPage = (pageCode, status = PAGE_STATUS_DRAFT) => makeRequest({
  uri: `/api/pages/${pageCode}?status=${status}`,
  method: METHODS.GET,
  mockResponse: fetchPageResponseMap[pageCode] || {},
  useAuthentication: true,
  errors: () => (
    fetchPageResponseMap[pageCode]
      ? []
      : [{ code: 1, message: `no page with the code ${pageCode} could be found.` }]
  ),
});

const fetchPageChildrenResponseMap = {
  homepage: [DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD],
  login: [],
  service: [NOTFOUND_PAYLOAD, ERROR_PAYLOAD, LOGIN_PAYLOAD],
  notfound: [],
  error: [],
  contacts: [],
};

export const getPageChildren = pageCode => makeRequest({
  uri: `/api/pages?parentCode=${pageCode}`,
  method: METHODS.GET,
  mockResponse: fetchPageChildrenResponseMap[pageCode] || {},
  useAuthentication: true,
  errors: () => (
    fetchPageChildrenResponseMap[pageCode]
      ? []
      : [{ code: 1, message: `no page with the code ${pageCode} could be found.` }]
  ),
});

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
