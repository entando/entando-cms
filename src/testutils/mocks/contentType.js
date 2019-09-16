export const GET_CONTENT_TYPE_RESPONSE_OK = {
  code: 'NWS',
  name: 'My News Content Type',
  status: '0',
  attributes: [],
  defaultContentModel: 'Full',
  defaultContentModelList: 'Full',
};

export const GET_CONTENT_TYPES_RESPONSE_OK = [
  {
    code: 'CNG',
    name: 'Generic Content',
    status: '0',
  },
  {
    code: 'NWS',
    name: 'News',
    status: '0',
  },
];

export const GET_GROUPS_RESPONSE_OK = {
  payload: [
    {
      name: 'Administrators',
      code: 'administrators',
    },
    {
      name: 'groupName',
      code: 'groupCode',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};

export const GET_CATEGORIES_RESPONSE_OK = {
  payload: [
    {
      code: 'code',
      parentCode: 'parentCode',
      titles: {
        it: 'Mio Titolo',
        en: 'My title',
      },
      children: ['categoryCode1', 'categoryCode2'],
    },
  ],
  errors: [],
  metaData: {
    parentCode: 'service',
  },
};
