import { SET_VIEWPAGES, SEARCH_PAGES } from 'state/pages/types';

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
    case SEARCH_PAGES: {
      return {
        ...state,
        searchPages: payload.pages,
      };
    }
    default:
      return state;
  }
};

export default reducer;
