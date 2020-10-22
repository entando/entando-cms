import { createMockStore, mockApi } from 'testutils/helpers';
import {
  setContentEntry,
  fetchContent,
  setOwnerGroupDisable,
  setGroups,
  fetchGroups,
  sendPostAddContent,
  sendPutEditContent,
  saveContent,
  setNewContentsType,
  clearEditContentForm,
  setMissingTranslations,
  setSaveType,
} from 'state/edit-content/actions';
import { GET_CONTENT_RESPONSE_OK } from 'testutils/mocks/editContent';
import {
  SET_CONTENT_ENTRY, SET_OWNER_GROUP_DISABLE, SET_GROUPS, WORK_MODE_ADD, WORK_MODE_EDIT,
  CLEAR_EDIT_CONTENT_FORM,
  SET_NEW_CONTENTS_TYPE,
  SET_MISSING_TRANSLATIONS,
  SET_SAVE_TYPE,
} from 'state/edit-content/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import {
  getContent, getGroups, postAddContent, putUpdateContent,
} from 'api/editContent';
import * as selectors from 'state/content-type/selectors';

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

const SET_MISSING_TRANSLATIONS_PARAMS = {
  type: SET_MISSING_TRANSLATIONS,
  payload: {
    missingTranslations: ['a', 'b'],
  },
};

const SET_SAVE_TYPE_PARAMS = {
  type: SET_SAVE_TYPE,
  payload: {
    saveType: 'test',
  },
};

const languages = {
  map: {
    en: {
      code: 'en',
      isActive: true,
      isDefault: true,
    },
    it: {
      code: 'it',
      isActive: false,
      isDefault: false,
    },
  },
  list: ['en', 'it'],
};

jest.mock('api/editContent', () => ({
  getContent: jest.fn(mockApi({ payload: { content: { categories: ['home'] } } })),
  getGroups: jest.fn(mockApi({ payload: ['a', 'b'] })),
  postAddContent: jest.fn(mockApi({ payload: { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } } })),
  putUpdateContent: jest.fn(mockApi({ payload: { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } } })),
}));

// eslint-disable-next-line no-import-assign
selectors.getSelectedContentTypeAttributes = jest.fn();

it('test setContentTemplateList action', () => {
  expect(setContentEntry(GET_CONTENT_RESPONSE_OK)).toEqual(SET_CONTENT);
});

it('test setOwnerGroupDisable action', () => {
  expect(setOwnerGroupDisable(true)).toEqual(SET_GROUP_DISABLED);
});

it('test clearEditContentForm action', () => {
  expect(clearEditContentForm()).toEqual({ type: CLEAR_EDIT_CONTENT_FORM });
});

it('test setNewContentsType action', () => {
  expect(setNewContentsType({ typeCode: 'NEWS', typeDescription: 'News' })).toEqual(
    { type: SET_NEW_CONTENTS_TYPE, payload: { typeCode: 'NEWS', typeDescription: 'News' } },
  );
});

it('test setGroups action', () => {
  expect(setGroups(['a', 'b'])).toEqual(SET_GROUPS_PARAMS);
});

it('test setMissingTranslations action', () => {
  expect(setMissingTranslations(['a', 'b'])).toEqual(SET_MISSING_TRANSLATIONS_PARAMS);
});

it('test setSaveType action', () => {
  expect(setSaveType('test')).toEqual(SET_SAVE_TYPE_PARAMS);
});

describe('editContent thunks', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({ editContent: { content: {} } });
  });
  it('fetchContent', (done) => {
    store
      .dispatch(fetchContent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_CONTENT_ENTRY);
        expect(actions[2].payload.content).toEqual({ content: { categories: ['home'] } });
        done();
      })
      .catch(done.fail);
  });
  it('fetchContent error', (done) => {
    getContent.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContent())
      .catch(() => {
        expect(getContent).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', 'errors/add-errors');
        done();
      });
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
    const tosend = { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } };
    store
      .dispatch(sendPostAddContent(tosend))
      .then((res) => {
        expect(postAddContent).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostContentTemplate error', (done) => {
    postAddContent.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } };
    store
      .dispatch(sendPostAddContent(tosend))
      .then((res) => {
        expect(postAddContent).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });
  it('sendPutEditContent', (done) => {
    const tosend = { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } };
    store
      .dispatch(sendPutEditContent(1, tosend))
      .then((res) => {
        expect(putUpdateContent).toHaveBeenCalledWith(1, tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPutEditContent error', (done) => {
    putUpdateContent.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } };
    store
      .dispatch(sendPutEditContent(1, tosend))
      .then((res) => {
        expect(putUpdateContent).toHaveBeenCalledWith(1, tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });

  it('save new content', (done) => {
    selectors.getSelectedContentTypeAttributes.mockImplementation(() => [{ type: 'Text' }]);
    store = createMockStore({
      apps:
      {
        cms: {
          editContent: { workMode: WORK_MODE_ADD, contentType: { typeCode: 'NEWS', typeDescription: 'News' } },
          languages,
        },
      },
      currentUser: { username: 'admin' },
      form: { editcontentform: { values: {} } },
    });
    store
      .dispatch(saveContent({ attributes: [{ value: 'test' }] })).then(() => done());
  });

  it('save add content', (done) => {
    selectors.getSelectedContentTypeAttributes.mockImplementation(() => [
      { type: 'Boolean' },
      { type: 'Timestamp' },
      { type: 'Monolist', nestedAttribute: { type: 'Boolean' } },
      { type: 'Monolist', nestedAttribute: { type: 'Date' } },
      { type: 'Monolist', nestedAttribute: { type: 'CheckBox' } },
      { type: 'List', nestedAttribute: { type: 'Number' } },
      {
        type: 'Composite',
        compositeAttributes: [{ type: 'Boolean' }, { type: 'Number' },
          { type: 'Timestamp' }, { type: 'CheckBox' }, { type: 'Image' }],
      },
      { type: 'List', nestedAttribute: { type: 'Boolean' } },
      { type: 'Date' },
      { type: 'Boolean' },
    ]);
    store = createMockStore({
      apps:
      {
        cms: {
          editContent: { workMode: WORK_MODE_EDIT, content: { id: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } } },
          languages,
        },
      },
      currentUser: { username: 'admin' },
      form: { editcontentform: { values: {} } },
    });
    store
      .dispatch(saveContent({
        contentStatus: 'ready',
        attributes: [
          { value: 'test' },
          { value: { date: new Date().toISOString() } },
          { elements: [{ value: false }] },
          { elements: [{ value: new Date().toISOString() }] },
          { elements: [{ value: 'true' }] },
          { listelements: { en: [{ value: '123' }] } },
          { compositeelements: [{ value: false }, { value: '123' }] },
          { listelements: { en: [{ value: false }] } }, { value: new Date().toISOString() }, { value: 'false' }],
      })).then(() => done());
  });

  it('save new content without attribues', (done) => {
    selectors.getSelectedContentTypeAttributes.mockImplementation(() => [{ type: 'Text' }]);
    store = createMockStore({
      apps:
      { cms: { editContent: { workMode: WORK_MODE_ADD, contentType: { typeCode: 'NEWS', typeDescription: 'News' } } } },
      currentUser: { username: 'admin' },
      form: { editcontentform: { values: {} } },
    });
    store
      .dispatch(saveContent({})).then(() => done());
  });

  it('save new content with ', (done) => {
    selectors.getSelectedContentTypeAttributes.mockImplementation(() => [{ type: 'Text' }]);
    store = createMockStore({
      apps:
      { cms: { editContent: { workMode: WORK_MODE_ADD, contentType: { typeCode: 'NEWS', typeDescription: 'News' } } } },
      currentUser: { username: 'admin' },
      form: {
        editcontentform: {
          values: {
            attributes: [],
          },
        },
      },
    });
    store
      .dispatch(saveContent({})).then(() => done());
  });
});
