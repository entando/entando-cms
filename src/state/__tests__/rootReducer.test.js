import reducer from 'state/rootReducer';

const state = reducer();

describe('root reducer store', () => {
  it('contains the correct number of states', () => {
    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(6);
  });

  it('contains the redux form state', () => {
    expect(state).toHaveProperty('form', {});
  });

  it('contains the messages state', () => {
    expect(state).toHaveProperty('messages');
  });
});
