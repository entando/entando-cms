import reducer from 'state/content-model/reducer';
import { setContentModelList } from 'state/content-model/actions';

describe('state/locale/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CONTENT_MODELS', () => {
    let state;
    beforeEach(() => {
      state = reducer({ list: [] }, setContentModelList(['a', 'b']));
    });
    it('list should not be empty', () => {
      expect(state).toHaveProperty('list');
      expect(state.list).toHaveLength(2);
    });
  });
});
