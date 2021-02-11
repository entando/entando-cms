import { configEnzymeAdapter } from 'testutils/helpers';
import {
  getUsers,
  getUserAuthorities,
} from 'api/users';
import {
  USERS,
  USER,
  AUTHORITIES,
} from 'testutils/mocks/users';

import { makeRequest, METHODS } from '@entando/apimanager';

configEnzymeAdapter();

const correctRequest = {
  uri: '/api/users',
  method: METHODS.GET,
  mockResponse: USERS,
  useAuthentication: true,
};

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

jest.unmock('api/users');

describe('api/users', () => {
  describe('getUsers', () => {
    it('returns a promise', () => {
      expect(getUsers()).toBeInstanceOf(Promise);
    });

    it('get user page 1 as first page', () => {
      getUsers({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
  describe('getUserAuthorities', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(getUserAuthorities(USER.username)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with user body', () => {
      getUserAuthorities(USER.username);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/users/${USER.username}/authorities`,
        method: METHODS.GET,
        mockResponse: AUTHORITIES,
        useAuthentication: true,
      }));
    });
  });
});
