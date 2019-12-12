import { createMockStore, mockApi } from 'testutils/helpers';
import { fetchViewPages, setViewPages } from 'state/pages/actions';
import { SET_VIEWPAGES } from 'state/pages/types';
import { getViewPages } from 'api/pages';

jest.mock('api/pages', () => ({
  getViewPages: jest.fn(mockApi({ payload: [] })),
}));

describe('state/pages/actions', () => {
  it('setViewPages should return correct object', () => {
    const payload = [{ test: 'view pages test' }];
    expect(setViewPages(payload)).toEqual({
      type: SET_VIEWPAGES,
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
});
