import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_GROUPS_RESPONSE_OK, GET_CATEGORIES_RESPONSE_OK } from 'testutils/mocks/contentType';

import { GET_CONTENT_RESPONSE_OK, POST_CONTENT_ADD_RESPONSE_OK } from 'testutils/mocks/editContent';

const getContentPath = '/api/plugins/cms/contents';
const getGroupsPath = '/api/groups';
const getCategoriesPath = '/api/categories';
const postAddContentPath = '/api/plugins/cms/contents/';

export const getContent = (params = '') =>
  makeRequest({
    // @TODO unable to fetch single content due to bug EN6-103, change path when issue is resolved
    uri: `${getContentPath}${params}`,
    method: METHODS.GET,
    contentType: 'application/json',
    mockResponse: GET_CONTENT_RESPONSE_OK,
    useAuthentication: true,
  });

export const getGroups = (params = '') =>
  makeRequest({
    uri: `${getGroupsPath}${params}`,
    method: METHODS.GET,
    contentType: 'application/json',
    mockResponse: GET_GROUPS_RESPONSE_OK,
    useAuthentication: true,
  });

export const getCategories = (params = '') =>
  makeRequest({
    uri: `${getCategoriesPath}${params}`,
    method: METHODS.GET,
    contentType: 'application/json',
    mockResponse: GET_CATEGORIES_RESPONSE_OK,
    useAuthentication: true,
  });

export const postAddContent = (addContentObject) =>
  makeRequest({
    uri: postAddContentPath,
    body: addContentObject,
    method: METHODS.POST,
    mockResponse: POST_CONTENT_ADD_RESPONSE_OK,
    useAuthentication: true,
  });
