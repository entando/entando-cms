import { createMockStore, mockApi } from 'testutils/helpers';
import { setContentTypeList, fetchContentTypeListPaged } from 'state/content-type/actions';
import { SET_CONTENT_TYPES } from 'state/content-type/types';
import { GET_CONTENT_TYPES_RESPONSE_OK } from 'testutils/mocks/contentType';
import { getContentTypes } from 'api/contentTypes';

const list = GET_CONTENT_TYPES_RESPONSE_OK;

const CONTTYPE_SET_PARAMS = {
  type: SET_CONTENT_TYPES,
  payload: {
    list,
  },
};

jest.mock('api/contentTypes', () => ({
  getContentTypes: jest.fn(mockApi({ payload: ['a', 'b'] })),
}));

it('test setContentTypeList action', () => {
  expect(setContentTypeList(list)).toEqual(CONTTYPE_SET_PARAMS);
});

describe('contentType thunks', () => {
  let store;
  beforeEach(() => {
    jest.unmock('api/contentTypes');
    store = createMockStore({ contentType: { list: [] } });
  });
  it('fetchContentModelListPaged', (done) => {
    store
      .dispatch(fetchContentTypeListPaged())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SET_CONTENT_TYPES);
        expect(actions[0].payload.list).toEqual(['a', 'b']);
        done();
      })
      .catch(done.fail);
  });
  it('fetchContentModelListPaged error', (done) => {
    getContentTypes.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContentTypeListPaged())
      .then(() => {
        expect(getContentTypes).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });
});
