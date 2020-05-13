import { USERS } from 'testutils/mocks/users';
import { makeRequest, METHODS } from '@entando/apimanager';

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

export default getUsers;
