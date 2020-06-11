import { makeMockRequest, METHODS } from '@entando/apimanager';
import { LIST_VERSIONING_OK, LIST_SINGLE_VERSIONING_OK } from 'testutils/mocks/versioning';

export const getVersionings = (versioningType, page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
    {
      uri: `/api/plugins/versioning/${versioningType}${params}`,
      method: METHODS.GET,
      mockResponse: LIST_VERSIONING_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getSingleVersioning = (versioningType, itemId, page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
    {
      uri: `/api/plugins/versioning/${versioningType}/${itemId}${params}`,
      method: METHODS.GET,
      mockResponse: LIST_SINGLE_VERSIONING_OK,
      useAuthentication: true,
    },
    page,
  )
);
