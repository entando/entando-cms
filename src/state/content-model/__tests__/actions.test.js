import { createMockStore, mockApi } from 'testutils/helpers';
import {
  pageDefault,
  setContentModelList,
  setContentModel,
  clearContentModel,
  fetchContentModelList,
  fetchContentModelListPaged,
  filterContentModelBySearch,
  fetchContentModelsByContentType,
  fetchContentModel,
  fetchContentModelDictionary,
  clearContentModelDictionary,
  sendPostContentModel,
  sendPutContentModel,
  sendDeleteContentModel,
} from 'state/content-model/actions';
import {
  SET_CONTENT_MODELS,
  SET_CONTENT_MODEL_OPENED,
  CLEAR_CONTENT_MODEL_OPENED,
  SET_CONTENT_MODEL_SEARCH_KEYWORD,
  SET_CONTENT_MODEL_FILTER,
  SET_CONTENT_MODEL_DICTIONARY,
  CLEAR_CONTENT_MODEL_DICTIONARY,
} from 'state/content-model/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';
import {
  getContentModels,
  postContentModel,
  getContentModel,
  putContentModel,
  deleteContentModel,
  getContentModelDictionary,
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
  getContentModel: jest.fn(id => mockApi({ payload: { id, code: 'GUU', a: 'b' } })()),
  putContentModel: jest.fn(res => mockApi({ payload: res })()),
  deleteContentModel: jest.fn(id => mockApi({ payload: { id } })()),
  getContentModelDictionary: jest.fn(mockApi({ payload: ['a', 'b'] })),
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

it('test clearContentModel action', () => {
  expect(clearContentModel()).toEqual({
    type: CLEAR_CONTENT_MODEL_OPENED,
  });
});

it('test clearContentModelDictionary action', () => {
  expect(clearContentModelDictionary()).toEqual({
    type: CLEAR_CONTENT_MODEL_DICTIONARY,
  });
});

const DEFAULT_STATE = {
  apps: {
    cms: {
      contentModel: {
        list: [],
        opened: {},
        filters: {
          filterProps: {},
          attribute: 'descr',
        },
      },
      contentType: {
        list: ['GUU'],
        map: {
          GUU: {
            code: 'GUU',
            name: 'GuuGuu',
          },
        },
      },
    },
  },
};

describe('contentModel thunks', () => {
  let store;

  beforeEach(() => {
    jest.unmock('api/contentModels');
    const STATE = { ...DEFAULT_STATE };
    store = createMockStore(STATE);
  });

  it('fetchContentModelList', (done) => {
    store.dispatch(fetchContentModelList()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[0].payload.id).toEqual('contentModelList');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_MODELS);
      expect(actions[1].payload.list).toEqual(['a', 'b']);
      done();
    }).catch(done.fail);
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

  it('filterContentModelBySearch', (done) => {
    const STATE = {
      apps: {
        cms: {
          contentModel: {
            list: [],
            opened: {},
            filters: {
              filterProps: {
                formValues: { descr: 'boger' },
                operators: { descr: 'like' },
              },
              attribute: 'descr',
            },
          },
          contentType: {
            list: ['GUU'],
            map: {
              GUU: {
                code: 'GUU',
                name: 'GuuGuu',
              },
            },
          },
        },
      },
    };
    store = createMockStore(STATE);

    store.dispatch(filterContentModelBySearch('boger')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_MODEL_SEARCH_KEYWORD);
      expect(actions[0].payload).toEqual('boger');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_MODEL_FILTER);
      expect(actions[1].payload).toHaveProperty('formValues');
      expect(actions[1].payload.formValues).toEqual({ descr: 'boger' });
      expect(actions[1].payload).toHaveProperty('operators');
      expect(actions[1].payload.operators).toEqual({ descr: 'like' });
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2].payload.id).toEqual('contentModelList');
      expect(actions[3]).toHaveProperty('type', SET_CONTENT_MODELS);
      expect(getContentModels).toHaveBeenCalledWith(pageDefault, '?filters[0].attribute=descr&filters[0].operator=like&filters[0].value=boger');
      done();
    }).catch(done.fail);
  });

  it('fetchContentModelsByContentType', (done) => {
    const STATE = {
      apps: {
        cms: {
          contentModel: {
            list: [],
            opened: {},
            filters: {
              filterProps: {
                formValues: { contentType: 'GUU' },
                operators: { contentType: 'eq' },
              },
              attribute: 'descr',
            },
          },
          contentType: {
            list: ['GUU'],
            map: {
              GUU: {
                code: 'GUU',
                name: 'GuuGuu',
              },
            },
          },
        },
      },
    };
    store = createMockStore(STATE);

    store.dispatch(fetchContentModelsByContentType('GUU')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_MODEL_SEARCH_KEYWORD);
      expect(actions[0].payload).toEqual('GUU');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_MODEL_FILTER);
      expect(actions[1].payload).toHaveProperty('formValues');
      expect(actions[1].payload.formValues).toEqual({ contentType: 'GUU' });
      expect(actions[1].payload).toHaveProperty('operators');
      expect(actions[1].payload.operators).toEqual({ contentType: 'eq' });
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2].payload.id).toEqual('contentModelList');
      expect(actions[3]).toHaveProperty('type', SET_CONTENT_MODELS);
      expect(getContentModels).toHaveBeenCalledWith(pageDefault, '?filters[0].attribute=contentType&filters[0].operator=eq&filters[0].value=GUU');
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

  it('fetchContentModel', (done) => {
    const idopen = 1;
    store.dispatch(fetchContentModel(idopen)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_MODEL_OPENED);
      expect(actions[0].payload).toEqual({ id: 1, code: 'GUU', a: 'b' });
      done();
    }).catch(done.fail);
  });

  it('fetchContentModel error', (done) => {
    getContentModel.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchContentModel(1)).then(() => {
      expect(getContentModel).toHaveBeenCalledWith(1);
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
      done();
    }).catch(done.fail);
  });

  it('fetchContentModelDictionary', (done) => {
    store.dispatch(fetchContentModelDictionary()).then(() => {
      expect(getContentModelDictionary).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_MODEL_DICTIONARY);
      expect(actions[0].payload).toEqual(['a', 'b']);
      done();
    }).catch(done.fail);
  });

  it('fetchContentModelDictionary error', (done) => {
    getContentModelDictionary.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchContentModelDictionary()).then(() => {
      expect(getContentModelDictionary).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
      done();
    }).catch(done.fail);
  });

  it('sendPutContentModel', (done) => {
    const tosend = { id: 1, contentType: 'YO' };
    store.dispatch(sendPutContentModel(tosend)).then((res) => {
      expect(putContentModel).toHaveBeenCalledWith(tosend);
      expect(res).toEqual(tosend);
      done();
    }).catch(done.fail);
  });

  it('sendPutContentModel error', (done) => {
    putContentModel.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { id: 1, contentType: 'YO' };
    store.dispatch(sendPutContentModel(tosend)).then((res) => {
      expect(putContentModel).toHaveBeenCalledWith(tosend);
      expect(res).toEqual(undefined);
      done();
    }).catch(done.fail);
  });

  it('sendDeleteContentModel', (done) => {
    const tosend = 1;
    store.dispatch(sendDeleteContentModel(tosend)).then((res) => {
      expect(deleteContentModel).toHaveBeenCalledWith(tosend);
      expect(res).toEqual({ id: tosend });
      done();
    }).catch(done.fail);
  });

  it('sendDeleteContentModel error', (done) => {
    deleteContentModel.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(sendDeleteContentModel(1)).then((res) => {
      expect(deleteContentModel).toHaveBeenCalledWith(1);
      expect(res).toEqual(undefined);
      done();
    }).catch(done.fail);
  });
});
