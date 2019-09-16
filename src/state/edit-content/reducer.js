import {
  SET_OWNER_GROUP_DISABLE,
  WORK_MODE_ADD,
  SET_WORK_MODE,
  SET_CONTENT_ENTRY,
  SET_GROUPS,
  JOIN_CATEGORY,
  UNJOIN_CATEGORY,
} from 'state/edit-content/types';

const defaultState = {
  ownerGroupDisabled: {
    disabled: false,
  },
  language: 'en',
  workMode: WORK_MODE_ADD,
  content: {
    contentType: 'NEWS',
    version: '0.0',
  },
  contentType: 'NEWS',
  groups: [
    { code: 'adminstrators', name: 'Administrators' },
    { code: 'freeAccess', name: 'Free Access' },
  ],
  joinedCategories: [],
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_OWNER_GROUP_DISABLE:
      return {
        ...state,
        ownerGroupDisabled: action.payload,
      };
    case SET_WORK_MODE:
      return {
        ...state,
        workMode: action.payload,
      };
    case SET_CONTENT_ENTRY:
      return {
        ...state,
        content: action.payload,
      };
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload.groups || [],
      };
    case JOIN_CATEGORY: {
      const { category: newCategory } = action.payload;
      const currentJoinedCategories = state.joinedCategories;
      const alreadyAdded = currentJoinedCategories.filter(
        category => category.code === newCategory.code,
      ).length > 0;
      if (!alreadyAdded) {
        return {
          ...state,
          joinedCategories: [...state.joinedCategories, action.payload.category],
        };
      }
      return state;
    }
    case UNJOIN_CATEGORY: {
      const { categoryCode } = action.payload;
      return {
        ...state,
        joinedCategories: state.joinedCategories.filter(category => category.code !== categoryCode),
      };
    }
    default:
      return state;
  }
};

export default reducer;
