import reducer from 'state/messages/reducer';
import {
  addMessage,
  clearMessages,
} from 'state/messages/actions';

let state;

describe('state/messages reducer', () => {
  it('returns the default state', () => {
    state = reducer();
    expect(state).toHaveLength(0);
    expect(state).toEqual([]);
  });

  describe('after the addMessage action', () => {
    it('adds the message to the state', () => {
      state = reducer(state, addMessage('my message'));
      expect(state).toHaveLength(1);
      expect(state).toHaveProperty('0', 'my message');
    });

    it('adds the new message to the bottom of the state', () => {
      state = reducer(state, addMessage('second message'));
      expect(state).toHaveLength(2);
      expect(state).toHaveProperty('1', 'second message');
    });

    describe('after the clearMessages', () => {
      it('restores the initial state', () => {
        expect(state).toHaveLength(2);
        state = reducer(state, clearMessages());
        expect(state).toHaveLength(0);
        expect(state).toEqual([]);
      });
    });
  });
});
