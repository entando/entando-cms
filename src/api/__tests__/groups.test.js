import { configEnzymeAdapter } from 'testutils/helpers';
import {
  getGroups,
  getGroup,
} from 'api/groups';
import { makeRequest, METHODS } from '@entando/apimanager';
import {
  LIST_GROUPS_OK,
} from 'testutils/mocks/groups';

configEnzymeAdapter();

const correctRequest = {
  uri: '/api/groups',
  method: METHODS.GET,
  mockResponse: LIST_GROUPS_OK,
  useAuthentication: true,
  errors: expect.any(Function),
};

const GROUP_CODE = 'free';

jest.unmock('api/groups');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

describe('api/groups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('returns a promise', () => {
      expect(getGroups()).toBeInstanceOf(Promise);
    });

    it('get group page 1 by default', () => {
      getGroups({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getGroups({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getGroups({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getGroups({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/groups?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('unsuccessful, run error', () => {
      makeRequest.mockImplementationOnce(jest.fn(({ errors }) => errors()));
      getGroups({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/groups',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('run error with additional params', () => {
      makeRequest.mockImplementationOnce(jest.fn(({ errors }) => errors()));
      getGroups({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/groups?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('getGroup()', () => {
    it('returns a promise', () => {
      expect(getGroup(GROUP_CODE)).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getGroup(GROUP_CODE);
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `/api/groups/${GROUP_CODE}`,
        mockResponse: expect.any(Object),
      });
    });

    it('if unsuccessful, calls errors', () => {
      makeRequest.mockImplementationOnce(jest.fn(({ errors }) => errors()));
      getGroup(GROUP_CODE);
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `/api/groups/${GROUP_CODE}`,
        mockResponse: expect.any(Object),
      });
    });
  });
});
