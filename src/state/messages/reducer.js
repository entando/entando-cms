import {
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} from 'state/messages/types';

const defaultState = [];

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        action.payload,
      ];
    case CLEAR_MESSAGES:
      return defaultState;
    default:
      return state;
  }
};

export default reducer;
