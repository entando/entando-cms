import { SET_CONTENT_TYPES } from 'state/content-type/types';

const defaultState = {
  list: [],
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_TYPES:
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
};

export default reducer;
