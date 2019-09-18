import { createMockStore, mockApi } from 'testutils/helpers';
import {
  setContentEntry,
  fetchContent,
  setOwnerGroupDisable,
  setGroups,
  fetchGroups,
  sendPostAddContent,
} from 'state/edit-content/actions';
import { GET_CONTENT_RESPONSE_OK } from 'testutils/mocks/editContent';
import { SET_CONTENT_ENTRY, SET_OWNER_GROUP_DISABLE, SET_GROUPS } from 'state/edit-content/types';
import { getContent, getGroups, postAddContent } from 'api/editContent';

const SET_CONTENT = {
  type: SET_CONTENT_ENTRY,
  payload: {
    content: GET_CONTENT_RESPONSE_OK,
  },
};

const SET_GROUP_DISABLED = {
  type: SET_OWNER_GROUP_DISABLE,
  payload: {
    disabled: true,
  },
};

const SET_GROUPS_PARAMS = {
  type: SET_GROUPS,
  payload: {
    groups: ['a', 'b'],
  },
};

jest.mock('api/editContent', () => ({
  getContent: jest.fn(mockApi({ payload: ['a', 'b'] })),
  getGroups: jest.fn(mockApi({ payload: ['a', 'b'] })),
  postAddContent: jest.fn(mockApi({ payload: { a: 1, contentType: 'YO' } })),
}));

it('test setContentModelList action', () => {
  expect(setContentEntry(GET_CONTENT_RESPONSE_OK)).toEqual(SET_CONTENT);
});

it('test setOwnerGroupDisable action', () => {
  expect(setOwnerGroupDisable(true)).toEqual(SET_GROUP_DISABLED);
});

it('test setGroups action', () => {
  expect(setGroups(['a', 'b'])).toEqual(SET_GROUPS_PARAMS);
});

describe('editContent thunks', () => {
  let store;
  beforeEach(() => {
    jest.unmock('api/editContent');
    store = createMockStore({ editContent: { content: {} } });
  });
  it('fetchContent', (done) => {
    store
      .dispatch(fetchContent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SET_CONTENT_ENTRY);
        expect(actions[0].payload.content).toEqual(['a', 'b']);
        done();
      })
      .catch(done.fail);
  });
  it('fetchContent error', (done) => {
    getContent.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContent())
      .then(() => {
        expect(getContent).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });
  it('fetchGroups', (done) => {
    store
      .dispatch(fetchGroups())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SET_GROUPS);
        expect(actions[0].payload.groups).toEqual(['a', 'b']);
        done();
      })
      .catch(done.fail);
  });
  it('fetchGroups error', (done) => {
    getGroups.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchGroups())
      .then(() => {
        expect(getGroups).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });
  it('sendPostAddContent', (done) => {
    const tosend = { a: 1, contentType: 'YO' };
    store
      .dispatch(sendPostAddContent(tosend))
      .then((res) => {
        expect(postAddContent).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostContentModel error', (done) => {
    postAddContent.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { a: 1, contentType: 'YO' };
    store
      .dispatch(sendPostAddContent(tosend))
      .then((res) => {
        expect(postAddContent).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });
});
