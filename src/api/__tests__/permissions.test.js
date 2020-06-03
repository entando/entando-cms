import { configEnzymeAdapter } from 'testutils/helpers';
import {
  getPermissions,
  getMyGroupPermissions,
} from 'api/permissions';
import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_PERMISSIONS_OK, MY_PERMISSIONS_PAYLOAD_OK } from 'testutils/mocks/permissions';

configEnzymeAdapter();

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/permissions', () => {
  it('getPermissions returns a promise', () => {
    const response = getPermissions();
    expect(makeRequest).toHaveBeenCalledWith(
      {
        uri: '/api/permissions',
        method: METHODS.GET,
        mockResponse: LIST_PERMISSIONS_OK,
        useAuthentication: true,
      },
      { page: 1, pageSize: 10 },
    );
    expect(response).toBeInstanceOf(Promise);
  });

  it('getMyGroupPermissions returns a promise', () => {
    const response = getMyGroupPermissions();
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/users/userProfiles/myGroupPermissions',
      method: METHODS.GET,
      mockResponse: MY_PERMISSIONS_PAYLOAD_OK,
      useAuthentication: true,
      useCredentials: true,
    });
    expect(response).toBeInstanceOf(Promise);
  });
});
