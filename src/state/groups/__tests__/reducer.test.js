import reducer from 'state/groups/reducer';

import {
  setGroups,
  setGroupsTotal,
  setSelectedGroup,
} from 'state/groups/actions';

import {
  getGroupsList,
  getSelectedGroup,
} from 'state/groups/selectors';

import {
  LIST_GROUPS_OK,
  BODY_OK,
} from 'testutils/mocks/groups';

describe('state/groups/reducer', () => {
  const state = reducer();
  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
    });
  });

  it('should return an object', () => {
    expect(state).toBeInstanceOf(Object);
    expect(state).toHaveProperty('total', 0);
    expect(state).toHaveProperty('list', []);
    expect(state).toHaveProperty('map', {});
    expect(state).toHaveProperty('selected', {});
  });

  describe('after action SET_GROUPS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setGroups(LIST_GROUPS_OK));
    });

    it('should define the groups payload', () => {
      expect(getGroupsList({ groups: newState })).toMatchObject(LIST_GROUPS_OK);
    });
  });

  describe('after action SET_GROUPS_TOTAL', () => {
    it('should define the groups payload', () => {
      const newState = reducer(state, setGroupsTotal(12));
      expect(newState).toHaveProperty('total', 12);
    });
  });

  describe('after action SET_SELECTED_GROUP', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedGroup(BODY_OK));
    });

    it('should define the selected group payload', () => {
      expect(getSelectedGroup({ groups: newState })).toMatchObject(BODY_OK);
    });
  });
});
