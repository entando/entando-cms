import { createMockStore } from 'testutils/helpers';
import { initialize } from 'redux-form';
import { ADD_ERRORS } from '@entando/messages';

import {
  setGroups,
  fetchGroups,
  setGroupsTotal,
  fetchGroupsTotal,
  fetchGroup,
} from 'state/groups/actions';
import {
  getGroup,
  getGroups,
} from 'api/groups';

import { LIST_GROUPS_OK } from 'testutils/mocks/groups';

import {
  SET_GROUPS,
  SET_GROUPS_TOTAL,
} from 'state/groups/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';

const GROUP_CODE = LIST_GROUPS_OK[0].code;
const INITIALIZE_TYPE = '@@redux-form/INITIALIZE';

jest.mock('api/groups', () => ({
  getGroups: jest.fn(),
  getGroup: jest.fn(),
}));

const GET_GROUPS_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_GROUPS_OK, metaData: { totalItems: 2 } })),
};

const GET_GROUP_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_GROUPS_OK[0] })),
};

const MOCK_RETURN_PROMISE_ERROR = {
  ok: false,
  json: () => new Promise(err => err({
    errors: [
      { message: 'what went wrong' },
    ],
  })),
};

getGroups.mockReturnValue(new Promise(resolve => resolve(GET_GROUPS_PROMISE)));
getGroup.mockReturnValue(new Promise(resolve => resolve(GET_GROUP_PROMISE)));

const INITIAL_STATE = {
  form: {},
  apps: {
    cms: {
      groups: {
        list: [],
        map: {},
        selected: {},
        total: 0,
      },
    },
  },
};

describe('state/groups/actions', () => {
  let store;

  beforeEach(() => {
    store = createMockStore(INITIAL_STATE);
  });

  describe('setGroups', () => {
    it('test setGroups action sets the correct type', () => {
      const action = setGroups(LIST_GROUPS_OK);
      expect(action).toHaveProperty('type', SET_GROUPS);
    });
  });

  describe('setGroupsTotal', () => {
    it('test setGroupsTotal action sets the correct type', () => {
      const action = setGroupsTotal(12);
      expect(action).toHaveProperty('type', SET_GROUPS_TOTAL);
      expect(action).toHaveProperty('payload.groupsTotal', 12);
    });
  });

  describe('fetchGroups', () => {
    it('fetchGroups calls setGroups and setPage actions', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(SET_GROUPS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        expect(actions[3].type).toEqual(SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('group is defined and properly valued', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.groups).toHaveLength(10);
        const group = actionPayload.groups[0];
        expect(group).toHaveProperty('code', 'account_executive');
        expect(group).toHaveProperty('name');
        done();
      }).catch(done.fail);
    });

    it('when getGroups get error, should dispatch addErrors', (done) => {
      getGroups.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchGroups()).then(() => {
        expect(getGroups).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchGroupsTotal', () => {
    it('fetchGroups calls setGroupsTotal', (done) => {
      store.dispatch(fetchGroupsTotal()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_GROUPS_TOTAL);
        done();
      }).catch(done.fail);
    });

    it('when getGroups errors it should dispatch addErrors', (done) => {
      getGroups.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchGroupsTotal()).then(() => {
        expect(getGroups).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchGroup()', () => {
    it('when getGroup succeeds, should dispatch inizialize', (done) => {
      getGroup.mockReturnValueOnce(new Promise(resolve => resolve(GET_GROUP_PROMISE)));
      store.dispatch(fetchGroup(GROUP_CODE)).then(() => {
        expect(getGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', INITIALIZE_TYPE);
        expect(actions[0]).toHaveProperty('payload', LIST_GROUPS_OK[0]);
        expect(initialize).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when getGroup get error, should dispatch addErrors', (done) => {
      getGroup.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchGroup()).then(() => {
        expect(getGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
