import { makeRequest, METHODS } from '@entando/apimanager';
import {
  GROUPS_NORMALIZED,
  LIST_GROUPS_OK,
} from 'testutils/mocks/groups';

const filterMockList = (groupCode) => {
  const selected = LIST_GROUPS_OK.filter(group => (group.code === groupCode));
  if (selected.length) {
    return selected[0];
  }

  return {};
};

const getGroupErrors = groupname => (
  GROUPS_NORMALIZED.apps.cms.groups.map[groupname] ? []
    : [{ code: 1, message: 'invalid group name' }]
);

const getGenericError = obj => (
  obj || (obj === '') ? [] : [{ code: 1, message: 'object is invalid' }]
);

export const getGroups = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/groups${params}`,
      method: METHODS.GET,
      mockResponse: LIST_GROUPS_OK,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);

export const getGroup = groupCode => (
  makeRequest({
    uri: `/api/groups/${groupCode}`,
    method: METHODS.GET,
    mockResponse: filterMockList(groupCode),
    useAuthentication: true,
    errors: () => getGroupErrors(groupCode),
  })
);
