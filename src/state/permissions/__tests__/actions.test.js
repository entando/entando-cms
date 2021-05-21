import {
  setPermissions,
  fetchPermissions,
  setLoggedUserPermissions,
  clearLoggedUserPermissions,
  fetchLoggedUserPermissions,
  setMyGroupPermissions,
  fetchMyGroupPermissions,
} from 'state/permissions/actions';

import { getPermissionsIdList } from 'state/permissions/selectors';

import { getPermissions, getMyGroupPermissions } from 'api/permissions';
import { LIST_PERMISSIONS_OK, MY_PERMISSIONS_PAYLOAD_OK } from 'testutils/mocks/permissions';
import {
  SET_PERMISSIONS,
  SET_LOGGED_USER_PERMISSIONS,
  CLEAR_LOGGED_USER_PERMISSIONS,
  SET_MY_GROUP_PERMISSIONS,
} from 'state/permissions/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { mockApi, createMockStore } from 'testutils/helpers';

const INITIAL_STATE = {
  permissions: {
    list: [],
    map: {},
  },
};

const MOCK_MY_PERMISSIONS = {
  result: [
    { group: 'not_free', role: ['admin'] },
    { group: 'free', role: ['not_admin'] },
  ],
  allPermissions: ['admin', 'not_admin'],
};

jest.mock('api/permissions', () => ({
  getPermissions: jest.fn(),
  getMyGroupPermissions: jest.fn(),
}));

jest.mock('state/permissions/selectors', () => ({
  getPermissionsIdList: jest.fn(),
}));

describe('state/permissions/actions', () => {
  let store;

  beforeEach(() => {
    store = createMockStore(INITIAL_STATE);
  });

  describe('setPermissions', () => {
    it('test setPermissions action sets the correct type', () => {
      const action = setPermissions(LIST_PERMISSIONS_OK);
      expect(action.type).toEqual(SET_PERMISSIONS);
    });
  });

  describe('logged user permissions', () => {
    it('setLoggedUserPermissions', () => {
      const action = setLoggedUserPermissions(MOCK_MY_PERMISSIONS);
      expect(action).toHaveProperty('type', SET_LOGGED_USER_PERMISSIONS);
      expect(action).toHaveProperty('payload', MOCK_MY_PERMISSIONS);
    });
    it('clearLoggedUserPermissions', () => {
      const action = clearLoggedUserPermissions();
      expect(action).toHaveProperty('type', CLEAR_LOGGED_USER_PERMISSIONS);
      expect(action).not.toHaveProperty('payload');
    });
  });

  describe('setMyGroupPermissions', () => {
    it('should create the correct action object', () => {
      const payload = [
        { group: 'test', permissions: ['superuser'] },
        { group: 'free', permissions: [] },
      ];
      const action = setMyGroupPermissions(payload);
      expect(action).toEqual({ type: SET_MY_GROUP_PERMISSIONS, payload });
    });
  });

  describe('fetchPermissions', () => {
    beforeEach(() => {
      getPermissions.mockImplementation(mockApi({ payload: LIST_PERMISSIONS_OK }));
    });

    it('fetchPermissions calls setPermissions and setPage actions', (done) => {
      store.dispatch(fetchPermissions()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_PERMISSIONS);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('permissions is defined and properly valued', (done) => {
      store.dispatch(fetchPermissions()).then(() => {
        expect(store.getActions()).toHaveLength(4);
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.permissions).toHaveLength(LIST_PERMISSIONS_OK.length);
        const permission = actionPayload.permissions[0];
        expect(permission).toHaveProperty('code', 'editContents');
        expect(permission).toHaveProperty('descr', 'content Editing');
        done();
      }).catch(done.fail);
    });

    it('when getPermissions get error, should dispatch addErrors', (done) => {
      getPermissions.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPermissions()).then(() => {
        expect(getPermissions).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchLoggedUserPermissions', () => {
    beforeEach(() => {
      getMyGroupPermissions.mockImplementation(mockApi({ payload: MY_PERMISSIONS_PAYLOAD_OK }));
      getPermissionsIdList.mockImplementation(() => ['superuser', 'managePages']);
    });

    it('logged user permissions is properly loaded', (done) => {
      store.dispatch(fetchLoggedUserPermissions()).then(() => {
        expect(getMyGroupPermissions).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        const actionPayload = actions[1];
        expect(actionPayload).toHaveProperty('type', SET_LOGGED_USER_PERMISSIONS);
        expect(actionPayload).toHaveProperty('payload', {
          result: MY_PERMISSIONS_PAYLOAD_OK,
          allPermissions: ['superuser', 'managePages'],
        });
        done();
      }).catch(done.fail);
    });

    it('when getPermissions get error, should dispatch addErrors', (done) => {
      getMyGroupPermissions.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchLoggedUserPermissions()).then(() => {
        expect(getMyGroupPermissions).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchMyGroupPermissions', () => {
    it('should call the correct actions after fetching', (done) => {
      const payload = MY_PERMISSIONS_PAYLOAD_OK;
      getMyGroupPermissions.mockImplementationOnce(mockApi({ payload }));
      store.dispatch(fetchMyGroupPermissions()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_MY_GROUP_PERMISSIONS, payload }]);
        done();
      }).catch(done.fail);
    });

    it('should call the correct actions on error', (done) => {
      getMyGroupPermissions.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchMyGroupPermissions()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[1]).toHaveProperty('type', 'toasts/add-toast');
        done();
      }).catch(done.fail);
    });
  });
});
