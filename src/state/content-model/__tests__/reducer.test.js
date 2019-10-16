import reducer from 'state/content-model/reducer';
import { setContentModelList, setContentModel } from 'state/content-model/actions';

describe('state/locale/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CONTENT_MODELS', () => {
    let state;
    beforeEach(() => {
      state = reducer({ list: [], opened: {} }, setContentModelList(['a', 'b']));
      state = reducer(state, setContentModel({ a: 1, b: 2 }));
    });
    it('list should not be empty', () => {
      expect(state).toHaveProperty('list');
      expect(state.list).toHaveLength(2);
    });
    it('opened should not be empty', () => {
      expect(state).toHaveProperty('opened');
      expect(Object.keys(state.opened)).toEqual(['a', 'b']);
    });
  });
});
