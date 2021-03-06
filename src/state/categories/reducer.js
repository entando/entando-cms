import { combineReducers } from 'redux';
import {
  SET_CATEGORIES,
  SET_CATEGORY_LOADED,
  SET_CATEGORY_LOADING,
  SET_CATEGORY_EXPANDED,
  SET_CATEGORY_TREE_FETCHED,
} from 'state/categories/types';

const toMap = (array, propKey) => array.reduce((acc, category) => {
  acc[category.code] = propKey ? category[propKey] : category;
  return acc;
}, {});

export const toIdList = array => array.map(category => category.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return toIdList(action.payload.categories);
    }
    default:
      return state;
  }
};

const categoryMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      const categories = action.payload.categories.map((category) => {
        const { children, ...result } = category;
        return result;
      });
      return {
        ...state,
        ...toMap(categories),
      };
    }
    default:
      return state;
  }
};

const childrenMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        ...toMap(action.payload.categories, 'children'),
      };
    }
    default:
      return state;
  }
};

const treeFetched = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORY_TREE_FETCHED: {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
};

const titlesMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        ...toMap(action.payload.categories, 'titles'),
      };
    }
    default:
      return state;
  }
};

const statusMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CATEGORY_EXPANDED: {
      const { categoryCode, expanded } = action.payload;
      return {
        ...state,
        [categoryCode]: {
          ...state[categoryCode],
          expanded: expanded !== undefined ? expanded : true,
        },
      };
    }
    case SET_CATEGORY_LOADING: {
      const { categoryCode } = action.payload;
      return {
        ...state,
        [categoryCode]: { ...state[categoryCode], loading: true },
      };
    }
    case SET_CATEGORY_LOADED: {
      const { categoryCode } = action.payload;
      return {
        ...state,
        [categoryCode]: { ...state[categoryCode], loaded: true, loading: false },
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  list,
  map: categoryMap,
  childrenMap,
  titlesMap,
  statusMap,
  treeFetched,
});
