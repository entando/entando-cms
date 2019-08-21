import reducer from 'state/content-type/reducer';
import { setContentTypeList } from 'state/content-type/actions';

describe('state/content-type/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CONTENT_TYPE', () => {
    let state;
    beforeEach(() => {
      state = reducer({ list: [] }, setContentTypeList(['a', 'b']));
    });
    it('list should not be empty', () => {
      expect(state).toHaveProperty('list');
      expect(state.list).toHaveLength(2);
    });
  });
});
