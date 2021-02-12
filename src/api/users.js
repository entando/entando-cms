import { makeRequest, METHODS } from '@entando/apimanager';

import { AUTHORITIES, USERS } from 'testutils/mocks/users';

export const getUsers = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/users${params}`,
      method: METHODS.GET,
      mockResponse: USERS,
      useAuthentication: true,
    },
    page,
  )
);

export const getUserAuthorities = username => makeRequest({
  uri: `/api/users/${username}/authorities`,
  method: METHODS.GET,
  mockResponse: AUTHORITIES,
  useAuthentication: true,
});
