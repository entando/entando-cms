import {
  getMessages,
  getLastMessage,
} from 'state/messages/selectors';

const state = {
  messages: [
    'my message',
    'last message',
  ],
};

describe('state/messages selectors', () => {
  describe('getMessages', () => {
    it('returns the full messages state', () => {
      expect(getMessages(state)).toBe(state.messages);
    });
  });

  describe('getLastMessage', () => {
    it('returns the last message in the state', () => {
      expect(getLastMessage(state)).toBe(state.messages[1]);
    });

    it('returns null if the state has no messages', () => {
      expect(getLastMessage({ messages: [] })).toBe(null);
    });
  });
});
