import { mockApi } from 'testutils/helpers';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setAssetCategoryFilter,
  setActiveFilters,
  setAssets,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  fetchAssets,
  sendPostAssetEdit,
  sendDeleteAsset,
} from 'state/assets/actions';
import {
  SET_ASSETS,
  SET_ASSET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  ASSETS_VIEW_CHANGE,
  FILE_TYPE_CHANGE,
  SET_ASSET_SYNC,
} from 'state/assets/types';
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
    it('deleting asset', (done) => {
      deleteAsset.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        apps: {
          cms: {
            assets: {
              assets: [], sort: { name: 'description', direction: 'ASC' }, fileType: 'image', filteringCategories: ['news'],
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendDeleteAsset(1))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(0);
          done();
        })
        .catch(done.fail);
    });

    it('when deleting asset it reports errors succesfully', (done) => {
      store = mockStore({
        apps: {
          cms: {
            assets: {
              assets: [], sort: { name: 'description', direction: 'ASC' }, fileType: 'image', filteringCategories: ['news'],
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      deleteAsset.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteAsset(1)).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
});
