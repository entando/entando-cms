import { SET_VIEWPAGES } from './types';

const initialState = {
  viewPages: [],
};

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SET_VIEWPAGES:
      return {
        ...state,
        viewPages: payload,
      };
    default:
      return state;
  }
};

export default reducer;
