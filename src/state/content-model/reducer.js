import {
  SET_CONTENT_MODELS,
  SET_CONTENT_MODEL_OPENED,
  SET_CONTENT_MODEL_FILTER,
  SET_CONTENT_MODEL_SEARCH_ATTRIBUTE,
  SET_CONTENT_MODEL_SEARCH_KEYWORD,
  SET_CONTENT_MODEL_DICTIONARY,
} from 'state/content-model/types';
import { combineReducers } from 'redux';

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODELS:
      return [
        ...action.payload.list,
      ];
    default:
      return state;
  }
};

const defaultDictState = {
  map: {},
  list: [],
};

const toListCodes = items => Object.entries(items).map(([key, value]) => ({
  code: key,
  methods: value,
}));

const dictionary = (state = defaultDictState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODEL_DICTIONARY:
      return {
        ...state,
        list: toListCodes(action.payload),
        map: action.payload,
      };
    default:
      return state;
  }
};

const opened = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODEL_OPENED:
      return {
        ...state,
        opened: action.payload,
      };
    default:
      return state;
  }
};

const defaultFilterState = {
  filterProps: {},
  attribute: '',
  keyword: '',
};

const filters = (state = defaultFilterState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_MODEL_FILTER:
      return {
        ...state,
        filterProps: action.payload,
      };
    case SET_CONTENT_MODEL_SEARCH_ATTRIBUTE:
      return {
        ...state,
        attribute: action.payload,
      };
    case SET_CONTENT_MODEL_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  list,
  opened,
  filters,
  dictionary,
});

export default reducer;
