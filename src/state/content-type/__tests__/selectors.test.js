import { CONTENT_TYPES_OK_PAGE, CONTENT_TYPE_REFERENCES_STATUS } from 'testutils/mocks/contentType';

import {
  getContentTypeState,
  getContentTypeIdList,
  getContentTypeMap,
  getContentTypeList,
  getSelectedContentType,
  getContentTypeAttributes,
  getContentTypeAttributesIdList,
  getContentTypeSelectedAttributeType,
  getContentTypeSelectedAttributeSearchable,
  getContentTypeSelectedAttributeIndexable,
  getContentTypeSelectedAttributeAllowedRoles,
  getContentTypeSelectedAttributeallowedDisablingCodes,
  getContentTypeReferencesStatus,
} from 'state/content-type/selectors';

const TEST_STATE = {
  contentType: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'contentType1',
        code: 'ABC',
        status: '0',
      },
      DEF: {
        name: 'contentType2',
        code: 'DEF',
        status: '0',
      },
    },
    attributes: {
    },
    references: {
      status: CONTENT_TYPE_REFERENCES_STATUS,
    },
  },
  pagination: CONTENT_TYPES_OK_PAGE.metaData,
};

const STATE_ATTRIBUTES = {
  contentType: {
    selected: {
      attributeSelected: {},
    },
    attributes: {
      list: [],
      selected: {
        code: '',
        attributeSelected: {},
        listAttribute: [],
        searchableOptionSupported: [],
        indexableOptionSupported: [],
        allowedRoles: [],
        allowedDisablingCodes: [],

      },

    },
  },
};

const STATE_ATTRIBUTES_NO_LIST = {
  contentType: {
    selected: {
      attributeSelected: {},
    },
    attributes: {
      selected: {

      },
    },
  },
};

describe('state/users/selectors', () => {
  it('getContentTypes(state) returns the users object', () => {
    const selected = getContentTypeState(TEST_STATE);
    expect(selected).toBe(TEST_STATE.contentType);
  });

  it('verify getContentTypeIdList selector', () => {
    expect(getContentTypeIdList(TEST_STATE)).toEqual(TEST_STATE.contentType.list);
  });

  it('verify getContentTypeMap selector', () => {
    expect(getContentTypeMap(TEST_STATE)).toEqual(TEST_STATE.contentType.map);
  });

  it('verify getContentTypeList selector', () => {
    expect(getContentTypeList(TEST_STATE)).toEqual(CONTENT_TYPES_OK_PAGE.payload);
  });

  it('verify getContentTypeReferencesStatus selector', () => {
    expect(getContentTypeReferencesStatus(TEST_STATE)).toMatchObject({
      type: 'warning', status: 'toRefresh', contentTypeCodes: ['CCC'], count: 1,
    });
  });

  it('verify getSelectedContentType selector is undefined', () => {
    expect(getSelectedContentType(TEST_STATE)).toBeUndefined();
  });

  it('verify getSelectedContentType selector is defined', () => {
    expect(getSelectedContentType({ contentType: { selected: {} } })).toBeDefined();
  });

  it('verify getContentTypeAttributes selector is defined', () => {
    expect(getContentTypeAttributes(TEST_STATE)).toBeDefined();
  });

  it('verify getContentTypeAttributesIdList selector is undefined', () => {
    expect(getContentTypeAttributesIdList(STATE_ATTRIBUTES_NO_LIST)).toBeUndefined();
  });

  it('verify getContentTypeAttributesIdList selector is defined', () => {
    expect(getContentTypeAttributesIdList(STATE_ATTRIBUTES)).toBeDefined();
  });

  it('verify getContentTypeSelectedAttributeType selector is defined', () => {
    expect(getContentTypeSelectedAttributeType(STATE_ATTRIBUTES)).toBeDefined();
  });

  it('verify getContentTypeSelectedAttributeSearchable selector is defined', () => {
    expect(getContentTypeSelectedAttributeSearchable(STATE_ATTRIBUTES)).toBeDefined();
  });

  it('verify getContentTypeSelectedAttributeIndexable selector is defined', () => {
    expect(getContentTypeSelectedAttributeIndexable(STATE_ATTRIBUTES)).toBeDefined();
  });

  it('verify getContentTypeSelectedAttributeAllowedRoles selector is defined', () => {
    expect(getContentTypeSelectedAttributeAllowedRoles(STATE_ATTRIBUTES)).toBeDefined();
  });

  it('verify getContentTypeSelectedAttributeallowedDisablingCodes selector is defined', () => {
    expect(getContentTypeSelectedAttributeallowedDisablingCodes(STATE_ATTRIBUTES)).toBeDefined();
  });
});
