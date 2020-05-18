import { createMockStore, mockApi } from 'testutils/helpers';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { putPageWidget } from 'api/pages';

jest.mock('api/pages', () => ({
  putPageWidget: jest.fn(mockApi({ payload: [] })),
}));

describe('state/pages/actions thunks', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      apps: {
        cms: {
        },
      },
    });
  });

  describe('putPageWidget', () => {
    it('should dispatch correct actions when api call is successful', (done) => {
      store
        .dispatch(sendPutWidgetConfig(1, 1, {}))
        .then(() => {
          expect(putPageWidget).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(0);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      putPageWidget.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(sendPutWidgetConfig(1, 1, {}))
        .then(() => {
          expect(putPageWidget).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          expect(actions[1]).toHaveProperty('type', 'errors/clear-errors');
          done();
        })
        .catch(done.fail);
    });
  });
});
