import { combineReducers } from 'redux';
import {
  ADD_PAGES,
  TOGGLE_PAGE_EXPANDED,
  SET_PAGE_LOADING,
  SET_PAGE_LOADED,
  SET_VIEWPAGES,
  SEARCH_PAGES,
  CLEAR_TREE,
  BATCH_TOGGLE_EXPANDED,
  COLLAPSE_ALL,
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
    case CLEAR_TREE: {
      return [];
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
    case CLEAR_TREE: {
      return {};
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
    case CLEAR_TREE: {
      return {};
    }
    default: return state;
  }
};

const toggleBatchExpandedValues = (arr, toggleValue) => {
  const newState = {};
  arr.map((pg) => {
    newState[pg] = { loaded: true, loading: false, expanded: toggleValue };
    return pg;
  });
  return newState;
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
    case CLEAR_TREE: {
      return {};
    }
    case BATCH_TOGGLE_EXPANDED: {
      const pageCodes = action.payload;
      return toggleBatchExpandedValues(pageCodes, true);
    }
    case COLLAPSE_ALL: {
      const newState = {};
      const pageCodes = Object.keys(state);
      pageCodes.map((p) => {
        newState[p] = { expanded: false, loading: false, loaded: state[p].loaded };
        return p;
      });
      return newState;
    }
    default: return state;
  }
};

const viewPages = (state = [], { type, payload } = {}) => {
  switch (type) {
    case SET_VIEWPAGES:
      return payload;
    case CLEAR_TREE: {
      return [];
    }
    default:
      return state;
  }
};

const searchPages = (state = [], { type, payload } = {}) => {
  switch (type) {
    case SEARCH_PAGES: {
      const { pages } = payload;
      return pages;
    }
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
  searchPages,
});
