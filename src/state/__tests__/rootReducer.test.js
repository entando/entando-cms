import reducer from 'state/rootReducer';

const state = reducer();

describe('root reducer store', () => {
  it('contains the correct number of states', () => {
    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(8);
  });
  it('contains the apps & cms state', () => {
    expect(state).toHaveProperty('apps');
    expect(state.apps).toHaveProperty('cms');
  });

  it('contains the redux form state', () => {
    expect(state).toHaveProperty('form', {});
  });

  it('contains the messages state', () => {
    expect(state).toHaveProperty('messages');
  });

  it('contains the editForm state', () => {
    expect(state.apps.cms).toHaveProperty('editContent');
  });

  it('contains the categories state', () => {
    expect(state.apps.cms).toHaveProperty('categories');
  });

  it('contains the content settings state', () => {
    expect(state.apps.cms).toHaveProperty('contentSettings');
  });
});
