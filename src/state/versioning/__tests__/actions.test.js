import {
  getVersionings,
  deleteVersion,
  restoreVersion,
  getSingleVersioning,
} from 'api/versioning';
import {
  setVersionings,
  setSelectedVersioningType,
  fetchVersionings,
  removeVersion,
  recoverVersion,
  fetchSingleVersioningHistory,
} from 'state/versioning/actions';
import { SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE } from 'state/versioning/types';

import { createMockStore, mockApi } from 'testutils/helpers';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';

jest.mock('api/versioning', () => ({
  getVersionings: jest.fn(),
  deleteVersion: jest.fn(),
  restoreVersion: jest.fn(),
  getSingleVersioning: jest.fn(),
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

  describe('removeVersion', () => {
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
        pagination: {
          global: {
            page: 1,
            pageSize: 10,
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      deleteVersion.mockImplementationOnce(mockApi({ payload: [] }));
      getVersionings.mockImplementationOnce(mockApi({ payload: [] }));

      store
        .dispatch(removeVersion())
        .then(() => {
          expect(deleteVersion).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(getVersionings).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      deleteVersion.mockImplementationOnce(mockApi({ errors: true }));

      store
        .dispatch(removeVersion())
        .then(() => {
          expect(deleteVersion).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });


  describe('recoverVersion', () => {
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
        pagination: {
          global: {
            page: 1,
            pageSize: 10,
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      restoreVersion.mockImplementationOnce(mockApi({ payload: [] }));
      getVersionings.mockImplementationOnce(mockApi({ payload: [] }));

      store
        .dispatch(recoverVersion())
        .then(() => {
          expect(restoreVersion).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(getVersionings).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      restoreVersion.mockImplementationOnce(mockApi({ errors: true }));

      store
        .dispatch(recoverVersion())
        .then(() => {
          expect(restoreVersion).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchSingleVersioningHistory', () => {
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
      getSingleVersioning.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(fetchSingleVersioningHistory())
        .then(() => {
          expect(getSingleVersioning).toHaveBeenCalled();
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
      getSingleVersioning.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchSingleVersioningHistory())
        .then(() => {
          expect(getSingleVersioning).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });
});
