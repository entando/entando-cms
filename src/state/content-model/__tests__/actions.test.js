import { createMockStore, mockApi } from 'testutils/helpers';
import {
  setContentModelList,
  setContentModel,
  fetchContentModelListPaged,
  fetchContentModel,
  sendPostContentModel,
  sendPutContentModel,
  sendDeleteContentModel,
} from 'state/content-model/actions';
import { SET_CONTENT_MODELS, SET_CONTENT_MODEL_OPENED } from 'state/content-model/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';
import {
  getContentModels,
  postContentModel,
  getContentModel,
  putContentModel,
  deleteContentModel,
} from 'api/contentModels';

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
  getContentModel: jest.fn(id => mockApi({ payload: { id, a: 'b' } })()),
  putContentModel: jest.fn(res => mockApi({ payload: res })()),
  deleteContentModel: jest.fn(id => mockApi({ payload: { id } })()),
}));

it('test setContentModelList action', () => {
  expect(setContentModelList(list)).toEqual(CONTMODEL_SET_PARAMS);
});

it('test setContentModel action', () => {
  expect(setContentModel(list[0])).toEqual({
    type: SET_CONTENT_MODEL_OPENED,
    payload: list[0],
  });
});

describe('contentModel thunks', () => {
  let store;
  beforeEach(() => {
    jest.unmock('api/contentModels');
    store = createMockStore({ apps: { cms: { contentModel: { list: [], opened: {} } } } });
  });
  it('fetchContentModelListPaged', (done) => {
    store
      .dispatch(fetchContentModelListPaged())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[0].payload.id).toEqual('contentModelList');
        expect(actions[1]).toHaveProperty('type', SET_CONTENT_MODELS);
        expect(actions[1].payload.list).toEqual(['a', 'b']);
        done();
      })
      .catch(done.fail);
  });
  it('fetchContentModelListPaged error', (done) => {
    getContentModels.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContentModelListPaged())
      .then(() => {
        expect(getContentModels).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });
  it('sendPostContentModel', (done) => {
    const tosend = { a: 1, contentType: 'YO' };
    store
      .dispatch(sendPostContentModel(tosend))
      .then((res) => {
        expect(postContentModel).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostContentModel error', (done) => {
    postContentModel.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { a: 1, contentType: 'YO' };
    store
      .dispatch(sendPostContentModel(tosend))
      .then((res) => {
        expect(postContentModel).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });

  it('fetchContentModel', (done) => {
    const idopen = 1;
    store
      .dispatch(fetchContentModel(idopen))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SET_CONTENT_MODEL_OPENED);
        expect(actions[0].payload).toEqual({ id: 1, a: 'b' });
        done();
      })
      .catch(done.fail);
  });

  it('fetchContentModel error', (done) => {
    getContentModel.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContentModel(1))
      .then(() => {
        expect(getContentModel).toHaveBeenCalledWith(1);
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });

  it('sendPutContentModel', (done) => {
    const tosend = { id: 1, contentType: 'YO' };
    store
      .dispatch(sendPutContentModel(tosend))
      .then((res) => {
        expect(putContentModel).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPutContentModel error', (done) => {
    putContentModel.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { id: 1, contentType: 'YO' };
    store
      .dispatch(sendPutContentModel(tosend))
      .then((res) => {
        expect(putContentModel).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });

  it('sendDeleteContentModel', (done) => {
    const tosend = 1;
    store
      .dispatch(sendDeleteContentModel(tosend))
      .then((res) => {
        expect(deleteContentModel).toHaveBeenCalledWith(tosend);
        expect(res).toEqual({ id: tosend });
        done();
      })
      .catch(done.fail);
  });

  it('sendDeleteContentModel error', (done) => {
    deleteContentModel.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendDeleteContentModel(1))
      .then((res) => {
        expect(deleteContentModel).toHaveBeenCalledWith(1);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });
});
