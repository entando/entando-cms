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
  contentType: 'ART',
  selectedCategories: undefined,
  language: undefined,
  saveType: undefined,
  selectedJoinGroups: undefined,
  content: {
    contentType: 'NEWS',
    version: '0.0',
  },
};

export const GET_CONTENT_RESPONSE_OK = {
  description: 'Article For Demo Purposes',
  lastModify: '10/10/2020 01-01-01',
  lastEditor: 'admin',
  status: 'PUBLIC',
  onLine: true,
  mainGroup: 'free',
  groups: ['customers'],
  version: '0.2',
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
  contentType: { typeCode: 'NEWS', typeDescription: 'News' },
};
