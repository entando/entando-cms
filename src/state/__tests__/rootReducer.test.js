import reducer from 'state/rootReducer';

const state = reducer();

describe('root reducer store', () => {
  it('contains the correct number of states', () => {
    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(13);
  });

  it('contains the apps & cms state', () => {
    expect(state).toHaveProperty('apps');
    expect(state.apps).toHaveProperty('cms');
    expect(Object.keys(state.apps.cms)).toHaveLength(12);
  });

  it('contains the apimanager state', () => {
    expect(state).toHaveProperty('api');
  });

  it('contains the contentTemplate state', () => {
    expect(state.apps.cms).toHaveProperty('contentTemplate');
  });

  it('contains the contentType state', () => {
    expect(state.apps.cms).toHaveProperty('contentType');
  });

  it('contains the currentUser state', () => {
    expect(state).toHaveProperty('currentUser');
  });

  it('contains the redux form state', () => {
    expect(state).toHaveProperty('form', {});
  });

  it('contains the loading state', () => {
    expect(state).toHaveProperty('loading');
  });

  it('contains the locale state', () => {
    expect(state).toHaveProperty('locale');
  });

  it('contains the messages state', () => {
    expect(state).toHaveProperty('messages');
  });

  it('contains the modal state', () => {
    expect(state).toHaveProperty('modal');
  });

  it('contains the pagination state', () => {
    expect(state).toHaveProperty('pagination');
  });

  it('contains the permissions state', () => {
    expect(state).toHaveProperty('permissions');
  });

  it('contains the groups state', () => {
    expect(state).toHaveProperty('groups');
  });

  it('contains the editForm state', () => {
    expect(state.apps.cms).toHaveProperty('editContent');
  });

  it('contains the assets state', () => {
    expect(state.apps.cms).toHaveProperty('assets');
  });

  it('contains the categories state', () => {
    expect(state.apps.cms).toHaveProperty('categories');
  });

  it('contains the content settings state', () => {
    expect(state.apps.cms).toHaveProperty('contentSettings');
  });

  it('contains the pages state', () => {
    expect(state.apps.cms).toHaveProperty('pages');
  });

  it('contains the versioning state', () => {
    expect(state.apps.cms).toHaveProperty('versioning');
  });
});
