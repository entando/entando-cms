import { mockApi } from 'testutils/helpers';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setAssetCategoryFilter,
  setActiveFilters,
  setAssets,
  removeActiveFilter,
  makeFilter,
  applyAssetsFilter,
  sortAssetsList,
  filterAssetsBySearch,
  changeFileType,
  changeAssetsView,
  fetchAssets,
  sendPostAssetEdit,
  sendDeleteAsset,
  resetFilteringCategories,
} from 'state/assets/actions';
import { SORT_DIRECTIONS } from '@entando/utils';
import {
  SET_ASSETS,
  SET_ASSET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  ASSETS_VIEW_CHANGE,
  FILE_TYPE_CHANGE,
  SET_ASSET_SYNC,
  SET_LIST_FILTER_PARAMS,
  SET_ASSET_SEARCH_KEYWORD,
  RESET_FILTERING_CATEGORIES,
} from 'state/assets/types';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { getAssets, editAsset, deleteAsset } from 'api/assets';

const ADD_ERRORS = 'errors/add-errors';
const CLEAR_ERRORS = 'errors/clear-errors';
const ADD_TOAST = 'toasts/add-toast';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('api/assets', () => ({
  getAssets: jest.fn(mockApi({ payload: ['a', 'b'], ok: true })),
  editAsset: jest.fn(res => mockApi({ payload: res })()),
  deleteAsset: jest.fn(id => mockApi({ payload: { id } })()),
}));

describe('state/assets/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ assets: { filteringCategories: [] } });
  });

  it('checks if setting a category filter works ok', () => {
    setAssetCategoryFilter('fifa_18');
    const state = store.getState();
    expect(state).toHaveProperty('assets');
    const { assets } = state;
    expect(assets).toHaveProperty('filteringCategories');
  });

  it('setAssetCategoryFilter() should return a well formed action', () => {
    const action = setAssetCategoryFilter('fifa_18');
    expect(action).toHaveProperty('type', SET_ASSET_CATEGORY_FILTER);
    expect(action.payload).toEqual('fifa_18');
  });

  it('setActiveFilters() should return a well formed action', () => {
    const action = setActiveFilters(['fifa_18', 'news']);
    expect(action).toHaveProperty('type', SET_ACTIVE_FILTERS);
    expect(action.payload).toEqual(['fifa_18', 'news']);
  });

  it('resetFilteringCategories() should return a well formed action', () => {
    const action = resetFilteringCategories();
    expect(action).toHaveProperty('type', RESET_FILTERING_CATEGORIES);
    expect(action.payload).toEqual(undefined);
  });

  it('setAssets() should return a well formed action', () => {
    const action = setAssets(['a', 'b']);
    expect(action).toHaveProperty('type', SET_ASSETS);
    expect(action.payload).toEqual(['a', 'b']);
  });

  it('removeActiveFilter() should return a well formed action', () => {
    const action = removeActiveFilter('fifa_18');
    expect(action).toHaveProperty('type', REMOVE_ACTIVE_FILTER);
    expect(action.payload).toEqual('fifa_18');
  });

  it('changeFileType() should return a well formed action', () => {
    const action = changeFileType('image');
    expect(action).toHaveProperty('type', FILE_TYPE_CHANGE);
    expect(action.payload).toEqual('image');
  });

  it('changeAssetsView() should return a well formed action', () => {
    const action = changeAssetsView('grid');
    expect(action).toHaveProperty('type', ASSETS_VIEW_CHANGE);
    expect(action.payload).toEqual('grid');
  });

  describe('handleExpandCategory()', () => {
    it('when fetching assets it fires all the appropriate actions', (done) => {
      getAssets.mockImplementationOnce(mockApi({ payload: ['a', 'b'], ok: true }));
      store = mockStore({
        assets: { assets: [] },
      });
      store
        .dispatch(fetchAssets())
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(4);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_ASSETS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching assets it reports errors succesfully', (done) => {
      getAssets.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        assets: { assets: [] },
      });
      store.dispatch(fetchAssets()).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(TOGGLE_LOADING)).toBe(true);
        expect(actions[1]).toEqual(ADD_ERRORS);
        done();
      });
    });
  });

  describe('filtering options', () => {
    beforeEach(() => {
      store = mockStore({
        apps: {
          cms: {
            assets: {
              assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
    });
    it('applyAssetsFilter', (done) => {
      const filters = { categories: makeFilter(['news', 'bits']) };
      store.dispatch(applyAssetsFilter(filters)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          formValues: { categories: ['news', 'bits'] },
          operators: { categories: 'eq' },
          sorting: undefined,
        });
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_ASSETS);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('sortAssetsList', (done) => {
      const attribute = 'name';
      store.dispatch(sortAssetsList(attribute)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          sorting: { attribute, direction: SORT_DIRECTIONS.ASCENDANT },
        });
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_ASSETS);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('sortAssetsList on reciprocating direction', (done) => {
      const attribute = 'name';
      const filterParams = {
        formValues: { cats: 1 },
        operators: { cats: 'eq' },
        sorting: { attribute, direction: SORT_DIRECTIONS.ASCENDANT },
      };
      store = mockStore({
        apps: {
          cms: {
            assets: {
              assets: [],
              filterParams,
              fileType: 'image',
              filteringCategories: ['cats'],
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(sortAssetsList(attribute)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          ...filterParams,
          sorting: {
            attribute,
            direction: SORT_DIRECTIONS.DESCENDANT,
          },
        });
        done();
      });
    });

    it('filterAssetsBySearch', (done) => {
      const keyword = 'keye';
      store.dispatch(filterAssetsBySearch(keyword)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_ASSET_SEARCH_KEYWORD);
        expect(actions[1]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[1]).toHaveProperty('payload', {
          formValues: {
            description: keyword,
          },
          operators: {
            description: 'like',
          },
          sorting: undefined,
        });
        done();
      });
    });

    it('filterAssetsBySearch on clearing', (done) => {
      const keyword = '';
      const filterParams = {
        formValues: { description: 'yo' },
        operators: { description: 'like' },
      };
      store = mockStore({
        apps: {
          cms: {
            assets: {
              assets: [],
              filterParams,
              fileType: 'image',
              filteringCategories: ['cats'],
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(filterAssetsBySearch(keyword)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_ASSET_SEARCH_KEYWORD);
        expect(actions[1]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[1]).toHaveProperty('payload', {
          formValues: {},
          operators: {},
          sorting: undefined,
        });
        done();
      });
    });
  });

  describe('sendPostAssetEdit', () => {
    const tosend = { id: 1, filename: 'jojo.jpg', description: 'jojopic' };
    const fileblob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' });
    it('sendPostAssetEdit success', (done) => {
      store
        .dispatch(sendPostAssetEdit(tosend, fileblob))
        .then(() => {
          expect(editAsset).toHaveBeenCalledWith(tosend.id, expect.any(Object), '?description=jojopic');
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[2]).toHaveProperty('type', SET_ASSET_SYNC);
          done();
        })
        .catch(done.fail);
    });

    it('sendPostAssetEdit error', (done) => {
      editAsset.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(sendPostAssetEdit(tosend, fileblob))
        .then((res) => {
          expect(editAsset).toHaveBeenCalledWith(tosend.id, expect.any(Object), '?description=jojopic');
          expect(res).toEqual(undefined);
          const actions = store.getActions();
          expect(actions).toHaveLength(5);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[2]).toHaveProperty('type', 'errors/add-errors');
          expect(actions[3]).toHaveProperty('type', 'toasts/add-toast');
          expect(actions[4]).toHaveProperty('type', 'errors/clear-errors');
          done();
        })
        .catch(done.fail);
    });
  });

  describe('deleteAsset()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        apps: {
          cms: {
            assets: {
              assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
    });
    it('deleting asset', (done) => {
      store
        .dispatch(sendDeleteAsset(1))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when deleting asset it reports errors succesfully', (done) => {
      deleteAsset.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteAsset(2)).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });
});
