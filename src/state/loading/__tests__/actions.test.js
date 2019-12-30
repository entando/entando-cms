import { toggleLoading, toggleGroupItemLoading } from 'state/loading/actions';
import { TOGGLE_LOADING, TOGGLE_GROUP_ITEM_LOADING } from 'state/loading/types';

const MOCK_PARAMETER = 'test';
const MOCK_GROUP_PARAMETER = { id: 'ITEM_ID', group: 'GROUP_ID' };

describe('state/loading/actions', () => {
  describe('toggleLoading', () => {
    let action;
    beforeEach(() => {
      action = toggleLoading(MOCK_PARAMETER);
    });

    it('is of type TOGGLE_LOADING', () => {
      expect(action.type).toBe(TOGGLE_LOADING);
    });

    it('defines the "id" payload property', () => {
      expect(action.payload.id).toBe(MOCK_PARAMETER);
    });
  });

  describe('toggleGroupItemLoading', () => {
    let action;
    beforeEach(() => {
      action = toggleGroupItemLoading(MOCK_GROUP_PARAMETER.id, MOCK_GROUP_PARAMETER.group);
    });

    it('is of type TOGGLE_GROUP_ITEM_LOADING', () => {
      expect(action.type).toBe(TOGGLE_GROUP_ITEM_LOADING);
    });

    it('defines the "id" and "group" payload properties', () => {
      expect(action.payload.id).toBe(MOCK_GROUP_PARAMETER.id);
      expect(action.payload.group).toBe(MOCK_GROUP_PARAMETER.group);
    });
  });
});
