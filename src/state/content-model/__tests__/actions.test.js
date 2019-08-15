import { createMockStore, mockApi } from 'testutils/helpers';
import { setContentModelList, fetchContentModelListPaged } from 'state/content-model/actions';
import { SET_CONTENT_MODELS } from 'state/content-model/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';
import { getContentModels } from 'api/contentModels';

const list = GET_CONTENT_MODELS_RESPONSE_OK;

const CONTMODEL_SET_PARAMS = {
  type: SET_CONTENT_MODELS,
  payload: {
    list,
  },
};

jest.mock('api/contentModels', () => ({
  getContentModels: jest.fn(mockApi({ payload: ['a', 'b'] })),
}));

it('test setContentModelList action', () => {
  expect(setContentModelList(list)).toEqual(CONTMODEL_SET_PARAMS);
});

describe('contentModel thunks', () => {
  let store;
  beforeEach(() => {
    jest.unmock('api/contentModels');
    store = createMockStore({ contentModel: { list: [] } });
  });
  it('fetchContentModelListPaged', (done) => {
    store.dispatch(fetchContentModelListPaged()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[0].payload.id).toEqual('contentModelList');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_MODELS);
      expect(actions[1].payload.list).toEqual(['a', 'b']);
      done();
    }).catch(done.fail);
  });
  it('fetchContentModelListPaged error', (done) => {
    getContentModels.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchContentModelListPaged()).then(() => {
      expect(getContentModels).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      done();
    }).catch(done.fail);
  });
});
