import reducer from 'state/users/reducer';
import { setUsers } from 'state/users/actions';
import { USERS } from 'testutils/mocks/users';

const users = USERS;

describe('state/users/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('list', []);
    expect(state).toHaveProperty('map', {});
    expect(state).toHaveProperty('authorities', []);
  });

  describe('after action SET_USERS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setUsers(users));
    });

    it('should define the dataType payload', () => {
      users.forEach((user, i) => {
        expect(newState.list[i]).toBe(user.username);
      });
    });
  });
});
