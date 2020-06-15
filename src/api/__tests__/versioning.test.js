import { configEnzymeAdapter } from 'testutils/helpers';
import {
  getVersionings,
  getSingleVersioning,
  deleteVersion,
  restoreVersion,
} from 'api/versioning';
import {
  LIST_VERSIONING_OK,
  LIST_SINGLE_VERSIONING_OK,
  DELETE_ATTACHMENT_OK,
  RESTORE_ATTACHMENT_OK,
} from 'testutils/mocks/versioning';

import { makeMockRequest, METHODS, makeRequest } from '@entando/apimanager';

configEnzymeAdapter();

const getVersioningUri = VERSIONING_TYPE => `/api/plugins/versioning/${VERSIONING_TYPE}`;

jest.mock('@entando/apimanager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

jest.unmock('api/versioning');

describe('api/versioning', () => {
  describe('getVersionings', () => {
    const VERSIONING_TYPE = 'contents';
    const PAGINATION = { page: 1, pageSize: 10 };

    afterEach(() => makeMockRequest.mockClear());

    it('returns a promise', () => {
      expect(getVersionings()).toBeInstanceOf(Promise);
    });

    it('passes correct parameters to request', () => {
      getVersionings(VERSIONING_TYPE, PAGINATION);

      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          uri: `${getVersioningUri(VERSIONING_TYPE)}`,
          method: METHODS.GET,
          useAuthentication: true,
          mockResponse: LIST_VERSIONING_OK,
        },
        PAGINATION,
      );
    });
  });

  describe('getSingleVersioning', () => {
    const VERSIONING_TYPE = 'contents';
    const ITEM_ID = 'ITEM_ID';
    const PAGINATION = { page: 1, pageSize: 10 };

    afterEach(() => makeMockRequest.mockClear());

    it('returns a promise', () => {
      expect(getSingleVersioning()).toBeInstanceOf(Promise);
    });

    it('passes correct parameters to request', () => {
      getSingleVersioning(VERSIONING_TYPE, ITEM_ID, PAGINATION);

      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: `${getVersioningUri(VERSIONING_TYPE)}/${ITEM_ID}`,
          method: METHODS.GET,
          useAuthentication: true,
          mockResponse: LIST_SINGLE_VERSIONING_OK,
        },
        PAGINATION,
      );
    });
  });

  describe('deleteVersion', () => {
    const VERSIONING_TYPE = 'attachments';
    const MOCK_ID = 'MOCK_ID';

    afterEach(() => makeMockRequest.mockClear());

    it('returns a promise', () => {
      expect(deleteVersion()).toBeInstanceOf(Promise);
    });

    it('passes versioning type and versionType ID', () => {
      deleteVersion(VERSIONING_TYPE, MOCK_ID);

      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          uri: `${getVersioningUri(VERSIONING_TYPE)}/${MOCK_ID}`,
          method: METHODS.DELETE,
          useAuthentication: true,
          mockResponse: DELETE_ATTACHMENT_OK,
        },
      );
    });
  });

  describe('restoreVersion', () => {
    const VERSIONING_TYPE = 'attachments';
    const MOCK_ID = 'MOCK_ID';
    const MOCK_VERSION = 'MOCK_VERSION';

    afterEach(() => makeMockRequest.mockClear());

    it('returns a promise', () => {
      expect(restoreVersion()).toBeInstanceOf(Promise);
    });

    it('passes versioning type and versionType ID', () => {
      restoreVersion(VERSIONING_TYPE, MOCK_ID, MOCK_VERSION);

      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          uri: `${getVersioningUri(VERSIONING_TYPE)}/${MOCK_ID}`,
          body: { version: MOCK_VERSION },
          method: METHODS.POST,
          useAuthentication: true,
          mockResponse: RESTORE_ATTACHMENT_OK,
        },
      );
    });
  });
});
