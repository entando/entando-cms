import reducer from 'state/assets/reducer';

import {
  setAssetCategoryFilter,
  setActiveFilters,
  setAssets,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  applySort,
} from 'state/assets/actions';

const ASSETS = ['dog.png', 'cat.png'];

describe('state/assets/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_ASSETS', () => {
    let state;
    beforeEach(() => {
      state = reducer({ filteringCategories: [] }, setAssets(ASSETS));
    });

    describe('action setCategoryFilter', () => {
      let newState;
      it('should correctly update filtering category state field', () => {
        newState = reducer(state, setAssetCategoryFilter({ code: 'fifa_18' }));
        expect(newState.filteringCategories).toEqual([{ code: 'fifa_18' }]);

        newState = reducer(newState, setAssetCategoryFilter({ code: 'a' }));
        expect(newState.filteringCategories).toEqual([{ code: 'fifa_18' }, { code: 'a' }]);

        newState = reducer(newState, setAssetCategoryFilter({ code: 'a' }));
        expect(newState.filteringCategories).toEqual([{ code: 'fifa_18' }]);

        newState = reducer(newState, setAssetCategoryFilter({ code: 'fifa_18' }));
        expect(newState.filteringCategories).toEqual([]);
      });
      it('should correctly change assets state field', () => {
        newState = reducer(state, setAssets(['a', 'b']));
        expect(newState.assets).toEqual(['a', 'b']);

        newState = reducer(state, setAssets(undefined));
        expect(newState.assets).toEqual([]);
      });
      it('should correctly change active filters state field', () => {
        newState = reducer(state, setActiveFilters([{ code: 'a' }, { code: 'b' }]));
        expect(newState.activeFilters).toEqual([{ code: 'a' }, { code: 'b' }]);
      });
      it('should correctly remove active filters state fields property', () => {
        newState = reducer(state, setActiveFilters([{ code: 'a' }, { code: 'b' }]));
        expect(newState.activeFilters).toEqual([{ code: 'a' }, { code: 'b' }]);

        newState = reducer(newState, removeActiveFilter({ code: 'a' }));
        expect(newState.activeFilters).toEqual([{ code: 'b' }]);
      });
      it('should correctly change file type state field', () => {
        newState = reducer(state, changeFileType('image'));
        expect(newState.fileType).toEqual('image');
      });
      it('should correctly change assets view state field', () => {
        newState = reducer(state, changeAssetsView('grid'));
        expect(newState.assetsView).toEqual('grid');
      });
      it('should correctly change sorting mechanics', () => {
        newState = reducer(state, applySort('name'));
        expect(newState.sort).toEqual({ name: 'name', direction: 'ASC' });

        newState = reducer(newState, applySort('name'));
        expect(newState.sort).toEqual({ name: 'name', direction: 'DESC' });

        newState = reducer(newState, applySort('name'));
        expect(newState.sort).toEqual({ name: 'name', direction: 'ASC' });

        newState = reducer(newState, applySort('otherName'));
        expect(newState.sort).toEqual({ name: 'otherName', direction: 'ASC' });
      });
    });
  });
});
