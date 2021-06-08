import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockApi } from 'testutils/helpers';
import {
  setCategories,
  setCategoryLoaded,
  fetchCategoryTree,
  setCategoryLoading,
  handleJoinCategory,
  handleExpandCategory,
  setCategoryExpanded,
  fetchCategoryTreeAll,
  setCategoryTreeFetched,
} from 'state/categories/actions';

import { getCategoryTree, getCategory } from 'api/categories';

import {
  SET_CATEGORIES,
  SET_CATEGORY_EXPANDED,
  SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED,
  SET_CATEGORY_TREE_FETCHED,
} from 'state/categories/types';

import {
  CATEGORY_TREE_HOME,
  STATE_NORMALIZED,
  HOME_PAYLOAD_FORSUB,
  SUBCATEGORY_PAYLOAD,
  CATEGORY_TREE_ROOT_WITHSUB,
} from 'testutils/mocks/categories';

import { TOGGLE_LOADING } from 'state/loading/types';

const CATEGORY_CODE = 'category_code';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  apps: {
    cms: {
      categories: {
        list: [],
        map: {},
        childrenMap: {},
        titlesMap: {},
        statusMap: {},
        selected: null,
      },
    },
  },
};

jest.mock('api/categories', () => ({
  getCategoryTree: jest.fn(mockApi({ payload: [{ code: 'home' }, { code: 'mycategory1' }] })),
  getCategory: jest.fn(mockApi({ payload: { code: 'home' } })),
}));

describe('state/categories/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  it('checks if joining content to a category works correctly', () => {
    store = mockStore({
      editContent: { joinedCategories: [] },
      categories: STATE_NORMALIZED.categories,
    });
    handleJoinCategory('home');
    const state = store.getState();
    expect(state).toHaveProperty('editContent');
    const { editContent } = state;
    expect(editContent).toHaveProperty('joinedCategories');
  });

  it('setCategories() should return a well formed action', () => {
    const CATEGORIES = [];
    const action = setCategories(CATEGORIES);
    expect(action).toHaveProperty('type', SET_CATEGORIES);
    expect(action.payload).toHaveProperty('categories', []);
  });

  it('setCategoryExpanded() should return a well formed action', () => {
    const action = setCategoryExpanded(CATEGORY_CODE, true);
    expect(action).toHaveProperty('type', SET_CATEGORY_EXPANDED);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
    expect(action.payload).toHaveProperty('expanded', true);
  });

  it('setCategoryTreeFetched() should return a well formed action', () => {
    const action = setCategoryTreeFetched(true);
    expect(action).toHaveProperty('type', SET_CATEGORY_TREE_FETCHED);
    expect(action.payload).toEqual(true);
  });

  it('setCategoryLoading() should return a well formed action', () => {
    const action = setCategoryLoading(CATEGORY_CODE);
    expect(action).toHaveProperty('type', SET_CATEGORY_LOADING);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
  });

  it('setCategoryLoaded() should return a well formed action', () => {
    const action = setCategoryLoaded(CATEGORY_CODE);
    expect(action).toHaveProperty('type', SET_CATEGORY_LOADED);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
  });

  describe('handleExpandCategory()', () => {
    beforeEach(() => {
      getCategoryTree.mockImplementation(mockApi({ payload: CATEGORY_TREE_HOME }));
    });
    it('when loading an already expanded category (home) set category expanded to false', (done) => {
      store = mockStore(STATE_NORMALIZED);
      store
        .dispatch(handleExpandCategory())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_CATEGORY_EXPANDED);
          expect(actions[0].payload).toHaveProperty('expanded', false);
          done();
        })
        .catch(done.fail);
    });

    it('when loading an already expanded category (home) set category expanded to true', (done) => {
      store = mockStore(STATE_NORMALIZED);
      store
        .dispatch(handleExpandCategory('home', true))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_CATEGORY_EXPANDED);
          expect(actions[0].payload).toHaveProperty('expanded', true);
          done();
        })
        .catch(done.fail);
    });

    it('when loading root category, should download the root and its children', (done) => {
      store = mockStore({
        apps: {
          cms: {
            categories: { statusMap: { home: { expandend: false, loaded: false } } },
          },
        },
      });
      store
        .dispatch(handleExpandCategory('home'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(8);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CATEGORY_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchCategoryTree', () => {
    beforeEach(() => {
      getCategoryTree.mockImplementation(mockApi({ payload: CATEGORY_TREE_HOME }));
    });

    it('if categoryCode is not home, only dispatch setCategories action', (done) => {
      store
        .dispatch(fetchCategoryTree('mycategory1'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_CATEGORIES);
          done();
        })
        .catch(done.fail);
    });
    it('if categoryCode is home, tree length should be all the size of mock data', (done) => {
      store
        .dispatch(fetchCategoryTree('home'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(5);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchCategoryTreeAll', () => {
    beforeEach(() => {
      getCategoryTree.mockImplementation((code) => {
        if (code === 'mycategory1') {
          return mockApi({ payload: [SUBCATEGORY_PAYLOAD] })();
        }
        return mockApi({ payload: CATEGORY_TREE_ROOT_WITHSUB })();
      });
      getCategory.mockImplementation(mockApi({ payload: HOME_PAYLOAD_FORSUB }));
    });

    it('return complete tree', (done) => {
      store.dispatch(fetchCategoryTreeAll())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_CATEGORIES);
          expect(actions[1]).toHaveProperty('type', SET_CATEGORY_TREE_FETCHED);
          done();
        })
        .catch(done.fail);
    });
  });
});
