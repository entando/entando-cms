const VALIDATION_RULES_DEFAULT = {
  minLength: null,
  maxLength: null,
  regex: null,
  rangeStartString: null,
  rangeEndString: null,
  rangeStartStringAttribute: null,
  rangeEndStringAttribute: null,
  equalString: null,
  equalStringAttribute: null,
  rangeStartDate: null,
  rangeEndDate: null,
  rangeStartDateAttribute: null,
  rangeEndDateAttribute: null,
  equalDate: null,
  equalDateAttribute: null,
  rangeStartNumber: null,
  rangeStartNumberAttribute: null,
  rangeEndNumber: null,
  rangeEndNumberAttribute: null,
  equalNumber: null,
  equalNumberAttribute: null,
  ognlValidation: null,
};

const attributes = [{
  type: 'type',
  code: 'attrCode',
  name: 'attr name',
  status: '0',
  roles: [{
    code: 'firstCode',
    descr: 'firstCode',
  }, {
    code: 'secondCode',
    descr: 'secondDescr',
  }],
  disablingCodes: [
    'firstDisablingCode',
    'secondDisablingCode',
  ],
  mandatory: true,
  listFilter: true,
  indexable: true,
  enumeratorStaticItems: null,
  enumeratorStaticItemsSeparator: null,
  enumeratorExtractorBean: null,
  validationRules: {
    ...VALIDATION_RULES_DEFAULT,
    ognlValidation: {
      ognlExpression: 'expression',
      applyOnlyToFilledAttr: false,
      helpMessage: 'Help message',
      keyForHelpMessage: null,
      errorMessage: 'Error Message',
      keyForErrorMessage: null,
    },
  },
  nestedAttribute: null,
  compositeAttributes: [],
}];

export const GET_CONTENT_TYPE_RESPONSE_OK = {
  code: 'NWS',
  name: 'My News Content Type',
  status: '0',
  attributes,
  defaultContentModel: 'Full',
  defaultContentModelList: 'Full',
};

export const GET_CONTENT_TYPES_RESPONSE_OK = [
  {
    code: 'CNG',
    name: 'Generic Content',
    status: '0',
    attributes,
  },
  {
    code: 'NWS',
    name: 'News',
    status: '0',
    attributes,
  },
];

export const CONTENT_TYPES_OK_PAGE = {
  payload: [
    {
      name: 'contentType1',
      code: 'ABC',
      status: '0',
    },
    {
      name: 'contentType2',
      code: 'DEF',
      status: '0',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 2,
    totalItems: 20,
  },
};

export const CONTENT_TYPES_DELETE_OK = { code: '<contentTypeCode>' };

export const CONTENT_TYPES_ATTRIBUTES = [
  'Enumerator',
  'Monotext',
  'Text',
];

export const CONTENT_TYPE_ATTRIBUTE = {
  code: 'Monotext',
  multilingual: false,
  textAttribute: false,
  simple: false,
  searchableOptionSupported: true,
  indexableOptionSupported: false,
  textFilterSupported: true,
  dateFilterSupported: false,
  numberFilterSupported: false,
  enumeratorOptionsSupported: false,
  enumeratorMapOptionsSupported: false,
  listAttribute: false,
  enumeratorExtractorBeans: [],
  enumeratorMapExtractorBeans: [],
  allowedRoles: [{
    code: 'roleCode1',
    descr: 'Role Descr 1',
  }, {
    code: 'roleCode2',
    descr: 'Role Descr 2',
  }],
  allowedDisablingCodes: [{
    code: 'Code1',
    descr: 'Description 1',
  }, {
    code: 'Code2',
    descr: 'Description 2',
  }],
};

export const CONTENT_TYPE_REFERENCES_STATUS = {
  ready: [
    'AAA',
    'BBB',
  ],
  toRefresh: [
    'CCC',
  ],
  refreshing: [],
};

export const CONTENT_TYPE_RELOAD_REFERENCES_STATUS = {
  result: 'success',
  dataTypeCodes: {
    AAA: 0,
    BBB: 1,
  },
};

export const ATTRIBUTE_CONTENT_TYPES_DELETE_OK = {
  contentTypeCode: 'contentTypeCode',
  attributeCode: 'attributeCode',
};

export const ATTRIBUTE_MOVE_UP = {
  attributeCode: 'title',
  dataTypeCode: 'DTT',
  movement: 'UP',
};

export const ATTRIBUTE_MOVE_DOWN = {
  attributeCode: 'title',
  dataTypeCode: 'DTT',
  movement: 'DOWN',
};

export const ATTRIBUTE_COMPOSITE = {
  code: 'Indirizzo',
  type: 'Composite',
  name: 'Indirizzo',
  roles: [],
  disablingCodes: [],
  mandatory: false,
  listFilter: false,
  indexable: false,
  enumeratorStaticItems: null,
  enumeratorStaticItemsSeparator: null,
  enumeratorExtractorBean: null,
  validationRules: VALIDATION_RULES_DEFAULT,
  nestedAttribute: null,
  compositeAttributes: [{
    code: 'Via',
    type: 'Text',
    name: 'Via',
    roles: [],
    disablingCodes: [],
    mandatory: false,
    listFilter: false,
    indexable: false,
    enumeratorStaticItems: null,
    enumeratorStaticItemsSeparator: null,
    enumeratorExtractorBean: null,
    validationRules: VALIDATION_RULES_DEFAULT,
    nestedAttribute: null,
    compositeAttributes: null,
  }, {
    code: 'Civico',
    type: 'Text',
    name: 'Civico',
    roles: [],
    disablingCodes: [],
    mandatory: true,
    listFilter: false,
    indexable: false,
    enumeratorStaticItems: null,
    enumeratorStaticItemsSeparator: null,
    enumeratorExtractorBean: null,
    validationRules: VALIDATION_RULES_DEFAULT,
    nestedAttribute: null,
    compositeAttributes: null,
  }, {
    type: 'Text',
    code: 'strada',
    name: 'strada',
    roles: [],
    nestedAttribute: {
      code: 'strada',
      enumeratorStaticItems: 'default',
      enumeratorStaticItemsSeparator: ',',
    },
  }],
};
export const ATTRIBUTE_MONOLIST_COMPOSITE = {
  code: 'mlstc',
  type: 'Monolist',
  name: 'Monolist Composite',
  roles: [],
  disablingCodes: [],
  mandatory: true,
  listFilter: false,
  indexable: false,
  enumeratorStaticItems: null,
  enumeratorStaticItemsSeparator: null,
  enumeratorExtractorBean: null,
  validationRules: VALIDATION_RULES_DEFAULT,
  nestedAttribute: {
    code: 'mlstc',
    type: 'Composite',
    name: null,
    roles: [],
    disablingCodes: [],
    mandatory: false,
    listFilter: false,
    indexable: false,
    enumeratorStaticItems: null,
    enumeratorStaticItemsSeparator: null,
    enumeratorExtractorBean: null,
    validationRules: VALIDATION_RULES_DEFAULT,
    nestedAttribute: null,
    compositeAttributes: [{
      code: 'testo',
      type: 'Text',
      name: 'testo',
      roles: [],
      disablingCodes: [],
      mandatory: true,
      listFilter: false,
      indexable: false,
      enumeratorStaticItems: null,
      enumeratorStaticItemsSeparator: null,
      enumeratorExtractorBean: null,
      validationRules: {
        ...VALIDATION_RULES_DEFAULT,
        minLength: 1,
        maxLength: 10,
      },
      nestedAttribute: null,
      compositeAttributes: null,
    }, {
      code: 'number',
      type: 'Number',
      name: 'number',
      roles: [],
      disablingCodes: [],
      mandatory: false,
      listFilter: false,
      indexable: false,
      enumeratorStaticItems: null,
      enumeratorStaticItemsSeparator: null,
      enumeratorExtractorBean: null,
      validationRules: VALIDATION_RULES_DEFAULT,
      nestedAttribute: null,
      compositeAttributes: null,
    }, {
      code: 'data',
      type: 'Date',
      name: 'data',
      roles: [],
      disablingCodes: [],
      mandatory: false,
      listFilter: false,
      indexable: false,
      enumeratorStaticItems: null,
      enumeratorStaticItemsSeparator: null,
      enumeratorExtractorBean: null,
      validationRules: {
        ...VALIDATION_RULES_DEFAULT,
        rangeStartDate: '2018-06-09 00:00:00',
        rangeEndDate: '2018-08-04 00:00:00',
      },
      nestedAttribute: null,
      compositeAttributes: null,
    }, {
      code: 'CAG',
      type: 'Text',
      name: 'Cagliari',
      roles: [],
      disablingCodes: [],
      mandatory: false,
      listFilter: false,
      indexable: false,
      enumeratorStaticItems: null,
      enumeratorStaticItemsSeparator: null,
      enumeratorExtractorBean: null,
      validationRules: VALIDATION_RULES_DEFAULT,
      nestedAttribute: null,
      compositeAttributes: null,
    }],
  },
  compositeAttributes: null,
};
