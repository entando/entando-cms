import reducer from 'state/content-model/reducer';
import {
  setContentModelList,
  setContentModel,
  clearContentModel,
  setContentModelDictionary,
  clearContentModelDictionary,
  setSearchKeyword,
  setSearchAttribute,
  setListFilterProps,
} from 'state/content-model/actions';

describe('state/locale/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CONTENT_MODELS', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        { list: [], opened: {} },
        setContentModelList(['a', 'b']),
      );
      state = reducer(state, setContentModel({ a: 1, b: 2 }));
    });

    it('list should not be empty', () => {
      expect(state).toHaveProperty('list');
      expect(state.list).toHaveLength(2);
    });

    it('opened should not be empty', () => {
      expect(state).toHaveProperty('opened');
      expect(Object.keys(state.opened)).toEqual(['a', 'b']);
      const state2 = reducer(state, clearContentModel());
      expect(state2.opened).toEqual({});
    });

    it('dictionary exists', () => {
      const mapo = { content: { getId: null } };
      state = reducer(state, setContentModelDictionary(mapo));
      expect(state).toHaveProperty('dictionary');
      expect(state.dictionary).toHaveProperty('list');
      expect(state.dictionary.list).toEqual([{
        code: 'content',
        methods: { getId: null },
      }]);
      expect(state.dictionary).toHaveProperty('map');
      expect(state.dictionary.map).toEqual(mapo);
      const state2 = reducer(state, clearContentModelDictionary());
      expect(state2.dictionary.list).toEqual([]);
      expect(state2.dictionary.map).toEqual({});
    });

    it('filters exists', () => {
      state = reducer(state, setSearchAttribute('deso'));
      state = reducer(state, setSearchKeyword('lator'));
      const pp = { out: 1 };
      state = reducer(state, setListFilterProps(pp));
      expect(state).toHaveProperty('filters');
      expect(state.filters).toHaveProperty('filterProps');
      expect(state.filters).toHaveProperty('attribute');
      expect(state.filters).toHaveProperty('keyword');
      expect(state.filters.keyword).toEqual('lator');
      expect(state.filters.attribute).toEqual('deso');
      expect(state.filters.filterProps).toEqual(pp);
    });
  });
});
