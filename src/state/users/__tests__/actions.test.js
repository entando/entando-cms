import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockApi } from 'testutils/helpers';

import {
  setUsers, fetchUsers,
} from 'state/users/actions';
import {
  SET_USERS,
} from 'state/users/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { USERS } from 'testutils/mocks/users';
import {
  getUsers,
} from 'api/users';

const ADD_ERRORS = 'errors/add-errors';
const ADD_TOAST = 'toasts/add-toast';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('api/users', () => ({
  getUsers: jest.fn(mockApi({ payload: [] })),
}));

describe('state/users/actions', () => {
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
  });

  describe('users actions ', () => {
    describe('data types actions ', () => {
      describe('setUsers', () => {
        it('test setUsers action sets the correct type', () => {
          const action = setUsers(USERS);
          expect(action).toHaveProperty('type', SET_USERS);
          expect(action).toHaveProperty('payload.users', USERS);
        });
      });
    });

    describe('thunk', () => {
      describe('test fetchUsers', () => {
        it('fetchUsers calls setUsers and setPage actions', (done) => {
          store.dispatch(fetchUsers()).then(() => {
            const actions = store.getActions();
            expect(getUsers).toHaveBeenCalled();
            expect(actions).toHaveLength(4);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1].type).toEqual(SET_USERS);
            expect(actions[2].type).toEqual(SET_PAGE);
            expect(actions[3].type).toEqual(TOGGLE_LOADING);
            done();
          }).catch(done.fail);
        });

        it('when fetchUsers get error, should dispatch addErrors', (done) => {
          getUsers.mockImplementationOnce(mockApi({ errors: true }));
          store.dispatch(fetchUsers()).then(() => {
            expect(getUsers).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(4);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
            expect(actions[2]).toHaveProperty('type', ADD_TOAST);
            expect(actions[3].type).toEqual(TOGGLE_LOADING);
            done();
          }).catch(done.fail);
        });
      });
    });
  });
});
