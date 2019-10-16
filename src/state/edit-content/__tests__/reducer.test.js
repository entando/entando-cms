import reducer from 'state/edit-content/reducer';
import {
  setGroups,
  setWorkMode,
  setOwnerGroupDisable,
  setContentEntry,
  setJoinedCategories,
} from 'state/edit-content/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';
import { onJoinCategory, onUnjoinCategory } from 'state/categories/actions';

const content = { contentType: 'NEWS', code: 'AwesomeContent' };

describe('state/edit-content/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action setGroups', () => {
    let state;
    state = reducer({ groups: [] }, setGroups(['a', 'b']));
    it('groups list should not be empty', () => {
      expect(state).toHaveProperty('groups');
      expect(state.groups).toHaveLength(2);
    });
    it('groups list should be empty despite sending null as a parameter', () => {
      state = reducer({ groups: [] }, setGroups(null));
      expect(state).toHaveProperty('groups');
      expect(state.groups).toHaveLength(0);
    });
  });
  describe('after action setJoinedCategories', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: [] }, setJoinedCategories(['home']));
    });
    it('joined categories should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['home']);
    });
  });
  describe('after action SET_WORK_MODE', () => {
    let state;
    beforeEach(() => {
      state = reducer({ workMode: null }, setWorkMode(WORK_MODE_ADD));
    });
    it('workMode should be ADD', () => {
      expect(state).toHaveProperty('workMode');
      expect(state.workMode).toEqual(WORK_MODE_ADD);
    });
  });
  describe('after action setOwnerGroupDisable', () => {
    let state;
    beforeEach(() => {
      state = reducer({ ownerGroupDisabled: false }, setOwnerGroupDisable(true));
    });
    it('owner group should become disabled', () => {
      expect(state).toHaveProperty('ownerGroupDisabled');
      expect(state.ownerGroupDisabled).toEqual({ disabled: true });
    });
  });
  describe('after action setContentEntry', () => {
    let state;
    beforeEach(() => {
      state = reducer({ content: {} }, setContentEntry(content));
    });
    it('Content should be changed', () => {
      expect(state).toHaveProperty('content');
      expect(state.content).toEqual(content);
    });
  });
  describe('after action JOIN_CATEGORY', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: ['OFFICE'] }, onJoinCategory('NEWS'));
    });
    it('Joined categories array should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['OFFICE', 'NEWS']);
    });
    it('Should not add already added category', () => {
      state = reducer({ joinedCategories: ['OFFICE'] }, onJoinCategory('OFFICE'));
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['OFFICE']);
    });
  });
  describe('after action UNJOIN_CATEGORY', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: ['NEWS', 'OFFICE'] }, onUnjoinCategory('NEWS'));
    });
    it('Joined categories array should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['OFFICE']);
    });
  });
});
