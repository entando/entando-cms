import { combineReducers } from 'redux';
import {
  ADD_PAGES,
  TOGGLE_PAGE_EXPANDED,
  SET_PAGE_LOADING,
  SET_PAGE_LOADED,
  SET_VIEWPAGES,
} from 'state/pages/types';

// creates a map from an array
const toMap = (array, propKey) => array.reduce((acc, page) => {
  acc[page.code] = propKey ? page[propKey] : page;
  return acc;
}, {});

// map reducer
const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      const pages = action.payload.pages.map((page) => {
        const { children, ...result } = page;
        return result;
      });
      return {
        ...state,
        ...toMap(pages),
      };
    }
    default: return state;
  }
};

const childrenMap = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      const newValues = {};
      action.payload.pages.forEach((page) => {
        if (state[page.parentCode] && !state[page.parentCode].includes(page.code)) {
          newValues[page.parentCode] = [...state[page.parentCode]];
          newValues[page.parentCode].push(page.code);
        }
      });
      return {
        ...state,
        ...toMap(action.payload.pages, 'children'),
        ...newValues,
      };
    }
    default: return state;
  }
};

const titlesMap = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_PAGES: {
      return {
        ...state,
        ...toMap(action.payload.pages, 'titles'),
      };
    }
    default: return state;
  }
};

const statusMap = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_PAGE_EXPANDED: {
      const { pageCode } = action.payload;
      const expanded = !(state[pageCode] && state[pageCode].expanded);
      return {
        ...state,
        [pageCode]: { ...state[pageCode], expanded },
      };
    }
    case SET_PAGE_LOADING: {
      const { pageCode } = action.payload;
      return {
        ...state,
        [pageCode]: { ...state[pageCode], loading: true },
      };
    }
    case SET_PAGE_LOADED: {
      const { pageCode } = action.payload;
      return {
        ...state,
        [pageCode]: { ...state[pageCode], loaded: true, loading: false },
      };
    }
    default: return state;
  }
};

const viewPages = (state = [], { type, payload } = {}) => {
  switch (type) {
    case SET_VIEWPAGES:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  map: reducer,
  childrenMap,
  titlesMap,
  statusMap,
  viewPages,
});
