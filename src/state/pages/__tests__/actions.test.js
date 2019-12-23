import { createMockStore, mockApi } from 'testutils/helpers';
import {
  fetchViewPages, setViewPages, setSearchPages, fetchSearchPages,
} from 'state/pages/actions';
import { SET_VIEWPAGES, SEARCH_PAGES } from 'state/pages/types';
import { getViewPages, getSearchPages } from 'api/pages';

jest.mock('api/pages', () => ({
  getViewPages: jest.fn(mockApi({ payload: [] })),
  getSearchPages: jest.fn(mockApi({ payload: [] })),
}));

describe('state/pages/actions', () => {
  it('setViewPages should return correct object', () => {
    const payload = [{ test: 'view pages test' }];
    expect(setViewPages(payload)).toEqual({
      type: SET_VIEWPAGES,
      payload,
    });
  });
  it('setSearchPages should return correct object', () => {
    const payload = { pages: ['a', 'b'] };
    expect(setSearchPages(['a', 'b'])).toEqual({
      type: SEARCH_PAGES,
      payload,
    });
  });
});


describe('state/pages/actions thunks', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      apps: {
        cms: {
          pages: {
            viewPages: [],
            searchPages: [],
          },
        },
      },
    });
  });

  describe('fetchViewPages', () => {
    it('should dispatch correct actions when api call is successful', (done) => {
      store
        .dispatch(fetchViewPages())
        .then(() => {
          expect(getViewPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_VIEWPAGES);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getViewPages.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchViewPages())
        .then(() => {
          expect(getViewPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchSearchPages', () => {
    it('should dispatch correct actions when api call is successful', (done) => {
      store
        .dispatch(fetchSearchPages())
        .then(() => {
          expect(getSearchPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SEARCH_PAGES);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getSearchPages.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchSearchPages())
        .then(() => {
          expect(getSearchPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });
});
