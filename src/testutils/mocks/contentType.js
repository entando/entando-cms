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
