import { getVersionings } from 'api/versioning';
import { setVersionings, setSelectedVersioningType, fetchVersionings } from 'state/versioning/actions';
import { SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE } from 'state/versioning/types';

import { createMockStore, mockApi } from 'testutils/helpers';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';

jest.mock('api/versioning', () => ({
  getVersionings: jest.fn(),
}));

describe('versioning actions', () => {
  describe('setVersionings', () => {
    it('test setVersionings action sets versionings correctly', () => {
      const payload = [{ id: 1 }];
      const action = setVersionings(payload);
      expect(action).toHaveProperty('type', SET_VERSIONINGS);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.versionings', payload);
    });

    it('sets a custom namespace', () => {
      const action = setSelectedVersioningType('contents');
      expect(action).toHaveProperty('type', SET_SELECTED_VERSIONING_TYPE);
      expect(action).toHaveProperty('payload', 'contents');
    });
  });

  describe('fetchVersionings', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        apps: {
          cms: {
            versioning: {
              list: [],
              map: {},
            },
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      getVersionings.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(fetchVersionings())
        .then(() => {
          expect(getVersionings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', SET_PAGE);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getVersionings.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchVersionings())
        .then(() => {
          expect(getVersionings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });
});
