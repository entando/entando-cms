
import {
  LIST_GROUPS_OK,
  GROUPS_NORMALIZED,
} from 'testutils/mocks/groups';

import {
  getGroups,
  getGroupsTotal,
  getGroupsIdList,
  getGroupsMap,
  getGroupsList,
} from 'state/groups/selectors';

describe('state/groups/selectors', () => {
  it('getGroups(state) returns the groups object', () => {
    const selected = getGroups(GROUPS_NORMALIZED);
    expect(selected).toBe(GROUPS_NORMALIZED.apps.cms.groups);
  });

  it('getGroupsTotal returns the current total', () => {
    const total = getGroupsTotal({
      apps: {
        cms: {
          groups: {
            total: 3,
          },
        },
      },
    });
    expect(total).toBe(3);
  });

  it('verify getGroupsIdList selector', () => {
    expect(getGroupsIdList(GROUPS_NORMALIZED)).toEqual(GROUPS_NORMALIZED.apps.cms.groups.list);
  });

  it('verify getGroupsMap selector', () => {
    expect(getGroupsMap(GROUPS_NORMALIZED)).toEqual(GROUPS_NORMALIZED.apps.cms.groups.map);
  });

  it('verify getGroupsList selector', () => {
    expect(getGroupsList(GROUPS_NORMALIZED)).toEqual(LIST_GROUPS_OK);
  });
});