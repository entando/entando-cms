import {
  getUsersIdList,
  getUsersMap,
  getUserList,
} from 'state/users/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const TEST_STATE = {
  apps: {
    cms: {
      users: {
        list: [],
        map: {},
      },
    },
  },
};


describe('state/users/selectors', () => {
  it('verify getUsersIdList selector', () => {
    expect(getUsersIdList(TEST_STATE)).toEqual(TEST_STATE.apps.cms.users.list);
  });

  it('verify getUsersMap selector', () => {
    expect(getUsersMap(TEST_STATE)).toEqual(TEST_STATE.apps.cms.users.map);
  });

  it('verify getUserList selector', () => {
    expect(getUserList(TEST_STATE)).toEqual([]);
  });
});
