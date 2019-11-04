export const EDIT_CONTENT_OPENED_OK = {
  ownerGroupDisabled: false,
  currentUser: 'admin',
  workMode: 'work-mode-edit',
  contentId: 1,
  content: {
    contentType: 'NEWS',
    version: '0.0',
  },
  groups: [
    { code: 'adminstrators', name: 'Administrators' },
    { code: 'freeAccess', name: 'Free Access' },
  ],
  selectedCategories: undefined,
  selectedJoinGroups: undefined,
  language: undefined,
  loading: undefined,
  saveType: undefined,
};

export const ADD_CONTENT_OPENED_OK = {
  ownerGroupDisabled: false,
  currentUser: 'admin',
  workMode: 'work-mode-add',
  groups: [
    { code: 'adminstrators', name: 'Administrators' },
    { code: 'freeAccess', name: 'Free Access' },
  ],
  contentType: undefined,
  selectedCategories: undefined,
  language: undefined,
  saveType: undefined,
  selectedJoinGroups: undefined,
};

export const GET_CONTENT_RESPONSE_OK = {
  payload: [],
  errors: [],
  metaData: {},
};

export const GET_CATEGORY_BY_CODE_OK = {
  payload: [],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};

export const POST_ADD_CONTENT_OK = {
  payload: [],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};

export const POST_CONTENT_ADD_RESPONSE_OK = {
  id: 10013,
  contentType: 'Generic Content',
};
