import { configEnzymeAdapter } from 'testutils/helpers';
import {
  getVersionings,
  getSingleVersioning,
  deleteVersion,
  restoreVersion,
  getContentDetails,
  postRecoverContentVersion,
  getResourceVersionings,
  deleteResourceVersion,
} from 'api/versioning';
import {
  LIST_VERSIONING_OK,
  LIST_SINGLE_VERSIONING_OK,
  DELETE_ATTACHMENT_OK,
  RESTORE_ATTACHMENT_OK,
  CONTENT_DETAILS_OK,
  LIST_ATTACHMENTS_OK,
} from 'testutils/mocks/versioning';

import { makeMockRequest, METHODS, makeRequest } from '@entando/apimanager';

configEnzymeAdapter();

const getVersioningUri = VERSIONING_TYPE => `/api/plugins/versioning/${VERSIONING_TYPE}`;

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
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

    afterEach(() => makeRequest.mockClear());

    it('returns a promise', () => {
      expect(getVersionings()).toBeInstanceOf(Promise);
    });

    it('passes correct parameters to request', () => {
      getVersionings(VERSIONING_TYPE, PAGINATION);

      expect(makeRequest).toHaveBeenCalledWith(
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

  describe('getResourceVersionings', () => {
    const RESOURCE_TYPE_CODE = 'Attach';
    const PAGINATION = { page: 1, pageSize: 10 };

    afterEach(() => makeRequest.mockClear());

    it('returns a promise', () => {
      expect(getResourceVersionings(RESOURCE_TYPE_CODE)).toBeInstanceOf(Promise);
    });

    it('passes correct parameters to request', () => {
      getResourceVersionings(RESOURCE_TYPE_CODE, PAGINATION);

      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: `/api/plugins/versioning/resources?resourceTypeCode=${RESOURCE_TYPE_CODE}`,
          method: METHODS.GET,
          useAuthentication: true,
          mockResponse: LIST_ATTACHMENTS_OK,
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

  describe('getContentDetails', () => {
    const CONTENT_ID = 'ART1';
    const VERSION_ID = 1;

    afterEach(() => makeMockRequest.mockClear());

    it('returns a promise', () => {
      expect(getContentDetails()).toBeInstanceOf(Promise);
    });

    it('passes correct parameters to request', () => {
      getContentDetails(CONTENT_ID, VERSION_ID);

      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: `/api/plugins/versioning/contents/${CONTENT_ID}/versions/${VERSION_ID}`,
          method: METHODS.GET,
          mockResponse: CONTENT_DETAILS_OK,
          useAuthentication: true,
        },
      );
    });
  });

  describe('deleteVersion', () => {
    const VERSIONING_TYPE = 'Attach';
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

  describe('deleteResourceVersion', () => {
    const VERSIONING_TYPE = 'Attach';
    const MOCK_ID = 'MOCK_ID';

    afterEach(() => makeMockRequest.mockClear());

    it('returns a promise', () => {
      expect(deleteResourceVersion()).toBeInstanceOf(Promise);
    });

    it('passes versioning type and versionType ID', () => {
      deleteResourceVersion(VERSIONING_TYPE, MOCK_ID);

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
    const VERSIONING_TYPE = 'Attach';
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

  describe('postRecoverContentVersion', () => {
    const MOCK_ID = 'MOCK_ID';
    const MOCK_VERSION = 'MOCK_VERSION';

    afterEach(() => makeRequest.mockClear());

    it('returns a promise', () => {
      expect(restoreVersion()).toBeInstanceOf(Promise);
    });

    it('passes content and version id', () => {
      postRecoverContentVersion(MOCK_ID, MOCK_VERSION);

      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: `/api/plugins/versioning/contents/${MOCK_ID}/versions/${MOCK_VERSION}/recover`,
          body: { version: MOCK_VERSION },
          method: METHODS.POST,
          useAuthentication: true,
          mockResponse: RESTORE_ATTACHMENT_OK,
        },
      );
    });
  });
});
