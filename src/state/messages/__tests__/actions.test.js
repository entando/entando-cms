import {
  addMessage,
  clearMessages,
} from 'state/messages/actions';
import {
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} from 'state/messages/types';

describe('state/messages actions', () => {
  describe('addMessage', () => {
    it('returns the proper action', () => {
      const action = addMessage('my message');
      expect(action).toHaveProperty('type', ADD_MESSAGE);
      expect(action).toHaveProperty('payload', 'my message');
    });
  });

  describe('clearMessages', () => {
    it('returns the proper action', () => {
      const action = clearMessages();
      expect(action).toHaveProperty('type', CLEAR_MESSAGES);
    });
  });
});
