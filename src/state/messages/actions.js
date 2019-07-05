import {
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} from 'state/messages/types';

export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});
