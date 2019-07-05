import { createSelector } from 'reselect';

export const getMessages = state => state.messages;

export const getLastMessage = createSelector(
  getMessages,
  messages => messages.slice(-1)[0] || null,
);
