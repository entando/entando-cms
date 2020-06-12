import { configEnzymeAdapter } from 'testutils/helpers';
import {
  deleteVersion,
  restoreVersion,
} from 'api/versioning';
import {
  DELETE_ATTACHMENT_OK,
  RESTORE_ATTACHMENT_OK,
} from 'testutils/mocks/versioning';

import { makeMockRequest, METHODS } from '@entando/apimanager';

configEnzymeAdapter();

const getVersioningUri = VERSIONING_TYPE => `/api/plugins/versioning/${VERSIONING_TYPE}`;

jest.mock('@entando/apimanager', () => ({
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
