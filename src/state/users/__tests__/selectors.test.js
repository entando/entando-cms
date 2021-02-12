import {
  getUsers,
  getUsersIdList,
  getUsersMap,
  getUserList,
  getSelectedUserAuthorities,
} from 'state/users/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const TEST_STATE = {
  apps: {
    cms: {
      users: {
        list: [],
        map: {},
        authorities: [],
      },
    },
  },
};


describe('state/users/selectors', () => {
  it('verify getUsers selector', () => {
    expect(getUsers(TEST_STATE)).toEqual(TEST_STATE.apps.cms.users);
  });
  it('verify getUsersIdList selector', () => {
    expect(getUsersIdList(TEST_STATE)).toEqual(TEST_STATE.apps.cms.users.list);
  });

  it('verify getUsersMap selector', () => {
    expect(getUsersMap(TEST_STATE)).toEqual(TEST_STATE.apps.cms.users.map);
  });

  it('verify getUserList selector', () => {
    expect(getUserList(TEST_STATE)).toEqual([]);
  });

  it('verify getSelectedUserAuthorities selector', () => {
    expect(getSelectedUserAuthorities(TEST_STATE)).toEqual([]);
  });
});
