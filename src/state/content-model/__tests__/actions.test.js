import { createMockStore, mockApi } from 'testutils/helpers';
import { setContentModelList, fetchContentModelListPaged, sendPostContentModel } from 'state/content-model/actions';
import { SET_CONTENT_MODELS } from 'state/content-model/types';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';
import { getContentModels, postContentModel } from 'api/contentModels';

const list = GET_CONTENT_MODELS_RESPONSE_OK;

const CONTMODEL_SET_PARAMS = {
  type: SET_CONTENT_MODELS,
  payload: {
    list,
  },
};

jest.mock('api/contentModels', () => ({
  getContentModels: jest.fn(mockApi({ payload: ['a', 'b'] })),
  postContentModel: jest.fn(res => mockApi({ payload: res })()),
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
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_MODELS);
      expect(actions[0].payload.list).toEqual(['a', 'b']);
      done();
    }).catch(done.fail);
  });
  it('fetchContentModelListPaged error', (done) => {
    getContentModels.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchContentModelListPaged()).then(() => {
      expect(getContentModels).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
      done();
    }).catch(done.fail);
  });
  it('sendPostContentModel', (done) => {
    const tosend = { a: 1, contentType: 'YO' };
    store.dispatch(sendPostContentModel(tosend)).then((res) => {
      expect(postContentModel).toHaveBeenCalledWith(tosend);
      expect(res).toEqual(tosend);
      done();
    }).catch(done.fail);
  });

  it('sendPostContentModel error', (done) => {
    postContentModel.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { a: 1, contentType: 'YO' };
    store.dispatch(sendPostContentModel(tosend)).then((res) => {
      expect(postContentModel).toHaveBeenCalledWith(tosend);
      expect(res).toEqual(undefined);
      done();
    }).catch(done.fail);
  });
});
