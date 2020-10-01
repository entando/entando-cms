import { makeRequest, METHODS } from '@entando/apimanager';
import { RESPONSE_CONTENTS_OK, RESPONSE_DELETE_OK, RESPONSE_PUBLISH_OK, RESPONSE_SINGLE_CONTENT } from 'testutils/mocks/contents';

const contentsPath = '/api/plugins/cms/contents';

export const getContents = (page, params = '') => makeRequest({
  uri: `${contentsPath}${params}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: RESPONSE_CONTENTS_OK,
  useAuthentication: true,
}, page);

export const getContentById = id => makeRequest({
  uri: `${contentsPath}/${id}`,
  method: METHODS.GET,
  contentType: 'application/json',
  mockResponse: RESPONSE_SINGLE_CONTENT,
  useAuthentication: true,
});

export const deleteContent = id => makeRequest({
  uri: `${contentsPath}/${id}`,
  method: METHODS.DELETE,
  contentType: 'application/json',
  mockResponse: RESPONSE_DELETE_OK,
  useAuthentication: true,
});

export const publishContent = (id, status) => makeRequest({
  uri: `${contentsPath}/${id}/status`,
  method: METHODS.PUT,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: { status },
});

export const publishMultipleContents = (contentIds, status) => makeRequest({
  uri: `${contentsPath}/status`,
  method: METHODS.PUT,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: { codes: contentIds, status },
});

export const updateContents = contents => makeRequest({
  uri: `${contentsPath}`,
  method: METHODS.PUT,
  contentType: 'application/json',
  mockResponse: RESPONSE_PUBLISH_OK,
  useAuthentication: true,
  body: contents,
});
