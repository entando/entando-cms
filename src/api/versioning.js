import { makeMockRequest, METHODS, makeRequest } from '@entando/apimanager';

import {
  LIST_VERSIONING_OK,
  LIST_SINGLE_VERSIONING_OK,
  LIST_ATTACHMENTS_OK,
  DELETE_ATTACHMENT_OK,
  RESTORE_ATTACHMENT_OK,
  LIST_IMAGES_OK,
  DELETE_IMAGE_OK,
  RESTORE_IMAGE_OK,
  CONTENT_DETAILS_OK,
  RESTORE_CONTENT_OK,
} from 'testutils/mocks/versioning';

const TYPE_MOCKS = {
  LIST: {
    attachments: LIST_ATTACHMENTS_OK,
    contents: LIST_VERSIONING_OK,
    images: LIST_IMAGES_OK,
  },
  DELETE: {
    attachments: DELETE_ATTACHMENT_OK,
    images: DELETE_IMAGE_OK,
  },
  RESTORE: {
    attachments: RESTORE_ATTACHMENT_OK,
    images: RESTORE_IMAGE_OK,
  },
};

export const getVersionings = (versioningType, page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/plugins/versioning/${versioningType}${params}`,
      method: METHODS.GET,
      mockResponse: TYPE_MOCKS.LIST[versioningType] || LIST_VERSIONING_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getSingleVersioning = (versioningType, itemId, page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/plugins/versioning/${versioningType}/${itemId}${params}`,
      method: METHODS.GET,
      mockResponse: LIST_SINGLE_VERSIONING_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getContentDetails = (contentId, versionId) => (
  makeRequest(
    {
      uri: `/api/plugins/versioning/contents/${contentId}/versions/${versionId}`,
      method: METHODS.GET,
      mockResponse: CONTENT_DETAILS_OK,
      useAuthentication: true,
    },
  )
);

export const deleteVersion = (versioningType, id) => (
  makeMockRequest(
    {
      uri: `/api/plugins/versioning/${versioningType}/${id}`,
      method: METHODS.DELETE,
      mockResponse: TYPE_MOCKS.DELETE[versioningType],
      useAuthentication: true,
    },
  )
);

export const restoreVersion = (versioningType, id, version) => (
  makeMockRequest(
    {
      uri: `/api/plugins/versioning/${versioningType}/${id}`,
      method: METHODS.POST,
      body: { version },
      mockResponse: TYPE_MOCKS.RESTORE[versioningType],
      useAuthentication: true,
    },
  )
);

export const postRecoverContentVersion = (id, version) => (
  makeRequest(
    {
      uri: `/api/plugins/versioning/contents/${id}/versions/${version}/recover`,
      method: METHODS.POST,
      body: { version },
      mockResponse: RESTORE_CONTENT_OK,
      useAuthentication: true,
    },
  )
);
