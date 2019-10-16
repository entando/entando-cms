import { SET_CONTENT_MODELS, SET_CONTENT_MODEL_OPENED } from 'state/content-model/types';

const defaultState = {
  list: [],
  opened: {},
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODELS:
      return {
        ...state,
        list: action.payload.list,
      };
    case SET_CONTENT_MODEL_OPENED:
      return {
        ...state,
        opened: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
