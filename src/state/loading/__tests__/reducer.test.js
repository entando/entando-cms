import reducer from 'state/loading/reducer';
import { toggleLoading, toggleGroupItemLoading } from 'state/loading/actions';

describe('state/loading/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
  });

  it('should define ad empty object', () => {
    expect(INITIAL_STATE).toMatchObject({});
  });

  describe('after action TOGGLE_LOADING', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, toggleLoading('test'));
    });

    it('should "id" defined as return true', () => {
      expect(newState.test).toBe(true);
    });

    it('should "id" defined as return false', () => {
      newState = reducer(newState, toggleLoading('test'));
      expect(newState.test).toBe(false);
    });

    it('should not change existing "id" after group loading is fired', () => {
      newState = reducer(newState, toggleGroupItemLoading('itemId', 'test'));
      expect(newState.test).toBe(true);
    });
  });

  describe('after action TOGGLE_GROUP_ITEM_LOADING', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, toggleGroupItemLoading('itemId', 'groupId'));
    });

    it('should have "group" defined', () => {
      expect(newState.groupId).toBeDefined();
    });

    it('should have "id" set to true', () => {
      expect(newState.groupId.itemId).toBe(true);
    });

    it('should have "id" set as false', () => {
      newState = reducer(newState, toggleGroupItemLoading('itemId', 'groupId'));
      expect(newState.groupId.itemId).toBe(false);
    });
  });
});
