import {
  SET_CONTENT_MODELS,
} from 'state/content-model/types';

const defaultState = {
  list: [],
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODELS:
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
};

export default reducer;
