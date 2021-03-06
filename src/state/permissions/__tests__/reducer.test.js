import reducer from 'state/permissions/reducer';
import {
  setPermissions,
  setLoggedUserPermissions,
  clearLoggedUserPermissions,
  setMyGroupPermissions,
} from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { LIST_PERMISSIONS_OK, MY_PERMISSIONS_PAYLOAD_OK } from 'testutils/mocks/permissions';
import { AUTHORITIES, EDIT_USER_PROFILE_AUTHORITIES } from 'testutils/mocks/users';

describe('state/permssions/reducer', () => {
  let state = reducer();

  describe('default state', () => {
    it('should be an object and has required properties', () => {
      expect(typeof state).toBe('object');
      expect(state).toHaveProperty('list');
      expect(state).toHaveProperty('map');
      expect(state).toHaveProperty('loggedUser');
      expect(state.loggedUser).toBe(null);
      expect(state).toHaveProperty('myGroupPermissions', []);
    });
  });

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_PERMISSIONS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPermissions(LIST_PERMISSIONS_OK));
    });

    it('should define the permissions payload', () => {
      expect(getPermissionsList({ permissions: newState })).toEqual(LIST_PERMISSIONS_OK);
    });
  });

  describe('logged user permissions', () => {
    const payloadUserAuthority = {
      result: AUTHORITIES,
      allPermissions: ['editor', 'supervisor', 'superuser', 'editUsers', 'viewUsers'],
    };

    const payloadUserAuthorityForEditUsers = {
      result: EDIT_USER_PROFILE_AUTHORITIES,
      allPermissions: ['editor', 'supervisor', 'superuser', 'editUsers', 'viewUsers'],
    };

    it('after action SET_LOGGED_USER_PERMISSIONS', () => {
      state = reducer(state, setLoggedUserPermissions(payloadUserAuthority));
      expect(state.loggedUser).toEqual([...AUTHORITIES.map(auth => auth.role), 'viewUsers']);
    });

    it('after action CLEAR_LOGGED_USER_PERMISSIONS', () => {
      state = reducer(state, clearLoggedUserPermissions());
      expect(state.loggedUser).toBe(null);
    });

    it('after action SET_LOGGED_USER_PERMISSIONS with different authorities', () => {
      state = reducer(state, setLoggedUserPermissions(payloadUserAuthorityForEditUsers));
      expect(state.loggedUser).toEqual([...EDIT_USER_PROFILE_AUTHORITIES.map(auth => auth.permissions[0]), 'viewUsers']);

      state = reducer(state, setLoggedUserPermissions(payloadUserAuthorityForEditUsers));
      expect(state.loggedUser).toEqual([...EDIT_USER_PROFILE_AUTHORITIES.map(auth => auth.permissions[0]), 'viewUsers']);
    });
  });

  describe('when action is SET_MY_GROUP_PERMISSIONS', () => {
    it('should update myGroupPermissions with action payload', () => {
      state = reducer(state, setMyGroupPermissions(MY_PERMISSIONS_PAYLOAD_OK));
      expect(state.myGroupPermissions).toEqual(MY_PERMISSIONS_PAYLOAD_OK);
    });
  });
});
