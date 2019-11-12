import { mockApi } from 'testutils/helpers';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { getContents, deleteContent, publishContent } from 'api/contents';
import {
  setQuickFilter, setContentType, setGroup, setSort,
  setContentCategoryFilter, checkStatus, checkAccess,
  checkAuthor, setCurrentAuthorShow, setCurrentStatusShow,
  setCurrentColumnsShow, selectRow, selectAllRows, fetchContents,
  sendDeleteContent, sendPublishContent,
} from 'state/contents/actions';
import {
  SET_QUICK_FILTER, SET_CONTENT_TYPE, SET_GROUP,
  SET_SORT, SET_CONTENT_CATEGORY_FILTER, CHECK_STATUS, CHECK_ACCESS,
  CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW, SET_CURRENT_STATUS_SHOW,
  SET_CURRENT_COLUMNS_SHOW, SELECT_ROW, SELECT_ALL_ROWS, SET_CONTENTS,
} from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ADD_ERRORS = 'errors/add-errors';
const CLEAR_ERRORS = 'errors/clear-errors';
const ADD_TOAST = 'toasts/add-toast';

jest.mock('api/contents', () => ({
  getContents: jest.fn(mockApi({ payload: ['a', 'b'], ok: true })),
  deleteContent: jest.fn(mockApi({ payload: { result: 'ok' } })),
  publishContent: jest.fn(mockApi({ payload: { result: 'ok' } })),
}));

describe('state/contents/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ assets: { filteringCategories: [] } });
  });

  it('setQuickFilter() should return a well formed action', () => {
    const action = setQuickFilter({ name: 'code', value: 'NEW2' });
    expect(action).toHaveProperty('type', SET_QUICK_FILTER);
    expect(action.payload.name).toEqual('code');
    expect(action.payload.value).toEqual('NEW2');
  });

  it('setContentType() should return a well formed action', () => {
    const action = setContentType('NEWS');
    expect(action).toHaveProperty('type', SET_CONTENT_TYPE);
    expect(action.payload).toEqual('NEWS');
  });

  it('setGroup() should return a well formed action', () => {
    const action = setGroup('free');
    expect(action).toHaveProperty('type', SET_GROUP);
    expect(action.payload).toEqual('free');
  });

  it('setSort() should return a well formed action', () => {
    const action = setSort({ description: { direction: 'ASC', position: 0 } });
    expect(action).toHaveProperty('type', SET_SORT);
    expect(action.payload).toEqual({ description: { direction: 'ASC', position: 0 } });
  });

  it('setContentCategoryFilter() should return a well formed action', () => {
    const action = setContentCategoryFilter({ code: 'NEWS', name: 'News' });
    expect(action).toHaveProperty('type', SET_CONTENT_CATEGORY_FILTER);
    expect(action.payload).toEqual({ code: 'NEWS', name: 'News' });
  });

  it('checkStatus() should return a well formed action', () => {
    const action = checkStatus('approved');
    expect(action).toHaveProperty('type', CHECK_STATUS);
    expect(action.payload).toEqual('approved');
  });

  it('checkAccess() should return a well formed action', () => {
    const action = checkAccess('open');
    expect(action).toHaveProperty('type', CHECK_ACCESS);
    expect(action.payload).toEqual('open');
  });

  it('checkAuthor() should return a well formed action', () => {
    const action = checkAuthor('me');
    expect(action).toHaveProperty('type', CHECK_AUTHOR);
    expect(action.payload).toEqual('me');
  });

  it('setCurrentAuthorShow() should return a well formed action', () => {
    const action = setCurrentAuthorShow('me');
    expect(action).toHaveProperty('type', SET_CURRENT_AUTHOR_SHOW);
    expect(action.payload).toEqual('me');
  });

  it('setCurrentStatusShow() should return a well formed action', () => {
    const action = setCurrentStatusShow('approved');
    expect(action).toHaveProperty('type', SET_CURRENT_STATUS_SHOW);
    expect(action.payload).toEqual('approved');
  });

  it('setCurrentColumnsShow() should return a well formed action', () => {
    const action = setCurrentColumnsShow(['created', 'status']);
    expect(action).toHaveProperty('type', SET_CURRENT_COLUMNS_SHOW);
    expect(action.payload).toEqual(['created', 'status']);
  });

  it('selectRow() should return a well formed action', () => {
    const action = selectRow({ id: 'row1' });
    expect(action).toHaveProperty('type', SELECT_ROW);
    expect(action.payload).toEqual({ id: 'row1' });
  });

  it('selectAllRows() should return a well formed action', () => {
    const action = selectAllRows(true);
    expect(action).toHaveProperty('type', SELECT_ALL_ROWS);
    expect(action.payload).toEqual(true);
  });

  describe('fetchContents()', () => {
    it('when fetching contents it fires all the appropriate actions', (done) => {
      getContents.mockImplementationOnce(mockApi({ payload: ['a', 'b'], ok: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store
        .dispatch(fetchContents())
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(4);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching contents it reports errors succesfully', (done) => {
      getContents.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store.dispatch(fetchContents()).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(5);
        expect(actions.includes(TOGGLE_LOADING)).toBe(true);
        expect(actions[1]).toEqual(ADD_ERRORS);
        done();
      });
    });
  });
  describe('deleteContent()', () => {
    it('when deleting content it fires all the appropriate actions', (done) => {
      deleteContent.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        apps: { cms: { contents: { contents: [] } } },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendDeleteContent('NEW1'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when deleting content it reports errors succesfully', (done) => {
      deleteContent.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store.dispatch(sendDeleteContent('NEW1')).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
  describe('publishContent()', () => {
    it('when publishing/unpublishing content it fires all the appropriate actions', (done) => {
      publishContent.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        apps: { cms: { contents: { contents: [] } } },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendPublishContent('NEW1', 'published'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when publishing/unpublishing content it reports errors succesfully', (done) => {
      publishContent.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store.dispatch(sendPublishContent('NEW1', 'published')).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
});
