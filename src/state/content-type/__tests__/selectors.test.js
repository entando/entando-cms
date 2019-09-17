import {
  GET_CONTENT_TYPES_RESPONSE_OK,
  CONTENT_TYPES_OK_PAGE,
  CONTENT_TYPE_REFERENCES_STATUS,
  ATTRIBUTE_MONOLIST_COMPOSITE,
  CONTENT_TYPES_ATTRIBUTES,
  CONTENT_TYPE_ATTRIBUTE,
} from 'testutils/mocks/contentType';

import {
  getContentTypeState,
  getContentTypeIdList,
  getContentTypeMap,
  getContentTypeList,
  getSelectedContentType,
  getContentTypeAttributes,
  getContentTypeAttributesIdList,
  getAttributeSelectFromContentType,
  getContentTypeSelectedAttribute,
  getContentTypeSelectedAttributeIsList,
  getSelectedContentTypeAttributes,
  getSelectedAttributeType,
  getSelectedAttributeNestedType,
  getSelectedValidationRules,
  getContentTypeSelectedAttributeCode,
  getActionModeContentTypeSelectedAttribute,
  getSelectedCompositeAttributes,
  getContentTypeSelectedAttributeType,
  getContentTypeSelectedAttributeSearchable,
  getContentTypeSelectedAttributeIndexable,
  getContentTypeSelectedAttributeAllowedRoles,
  getContentTypeSelectedAttributeallowedDisablingCodes,
  getContentTypeReferencesStatus,
  getMonolistAttributeType,
  getIsMonolistCompositeAttributeType,
  getNewAttributeComposite,
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
      selected: '',
    },
    references: {
      status: CONTENT_TYPE_REFERENCES_STATUS,
    },
  },
  pagination: CONTENT_TYPES_OK_PAGE.metaData,
};

const TEST_STATE_HAS_BLANKSELECTED = {
  contentType: {
    list: GET_CONTENT_TYPES_RESPONSE_OK,
    selected: {},
    attributes: {
      list: CONTENT_TYPES_ATTRIBUTES,
      selected: CONTENT_TYPE_ATTRIBUTE,
    },
  },
};

const STATE_ATTRIBUTES = {
  contentType: {
    selected: {
      attributes: 'ey',
      attributeSelected: {
        type: 'A',
        nestedAttribute: {
          type: 'B',
        },
        validationRules: [4],
      },
      actionMode: 'wa',
    },
    attributes: {
      list: [],
      selected: {
        code: 'lecode',
        attributeSelected: {},
        listAttribute: [1],
        searchableOptionSupported: [2],
        indexableOptionSupported: [3],
        allowedRoles: [4],
        allowedDisablingCodes: [5],
      },
    },
  },
};

const STATE_ATTRIBUTES_MONOLIST = {
  contentType: {
    selected: {
      attributes: 'ey',
      attributeSelected: ATTRIBUTE_MONOLIST_COMPOSITE,
    },
  },
};

const STATE_ATTRIBUTES_NO_LIST = {
  contentType: {
    selected: {
      attributeSelected: {},
    },
    attributes: {
      selected: {},
    },
  },
};

describe('state/content-type/selectors', () => {
  it('getContentTypeState(state) returns the content-type object', () => {
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

  it('verify getContentTypeSelectedAttribute selector', () => {
    expect(
      getContentTypeSelectedAttribute(STATE_ATTRIBUTES),
    ).toEqual(STATE_ATTRIBUTES.contentType.attributes.selected);
  });

  it('verify getContentTypeSelectedAttributeIsList selector', () => {
    expect(getContentTypeSelectedAttributeIsList(STATE_ATTRIBUTES)).toEqual([1]);
  });

  it('verify getSelectedContentTypeAttributes selector', () => {
    expect(getSelectedContentTypeAttributes(STATE_ATTRIBUTES)).toEqual('ey');
  });

  it('verify getSelectedAttributeType selector', () => {
    expect(getSelectedAttributeType(STATE_ATTRIBUTES)).toEqual('A');
  });

  it('verify getSelectedAttributeNestedType selector', () => {
    expect(getSelectedAttributeNestedType(STATE_ATTRIBUTES)).toEqual('B');
  });

  it('verify getSelectedValidationRules selector', () => {
    expect(getSelectedValidationRules(STATE_ATTRIBUTES)).toEqual([4]);
  });

  it('verify getContentTypeSelectedAttributeCode selector', () => {
    expect(getContentTypeSelectedAttributeCode(STATE_ATTRIBUTES)).toEqual('lecode');
  });

  it('verify getContentTypeReferencesStatus selector', () => {
    expect(getContentTypeReferencesStatus(TEST_STATE)).toMatchObject({
      type: 'warning', status: 'toRefresh', contentTypeCodes: ['CCC'], count: 1,
    });
    const anotherState = {
      contentType: {
        references: {
          status: {
            ready: [
              'AAA',
              'BBB',
            ],
            toRefresh: [],
            refreshing: [],
          },
        },
      },
    };
    expect(getContentTypeReferencesStatus(anotherState)).toMatchObject({
      type: 'success', status: 'ready', contentTypeCode: [],
    });
  });

  it('verify getActionModeContentTypeSelectedAttribute selector', () => {
    expect(getActionModeContentTypeSelectedAttribute(STATE_ATTRIBUTES)).toEqual('wa');
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

  it('verify getContentTypeAttributesIdList returning list except selected attribute', () => {
    const LIST_SELECTED = { ...TEST_STATE_HAS_BLANKSELECTED };
    LIST_SELECTED.contentType.attributes.selected = { code: 'List' };
    expect(getContentTypeAttributesIdList(LIST_SELECTED)).toEqual([
      'Enumerator',
      'Monotext',
    ]);
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

  it('verify getAttributeSelectFromContentType selector is defined', () => {
    expect(getAttributeSelectFromContentType(STATE_ATTRIBUTES).type).toEqual('A');
  });

  it('verify getSelectedCompositeAttributes selector is defined', () => {
    expect(getSelectedCompositeAttributes(TEST_STATE_HAS_BLANKSELECTED)).toEqual([]);
    expect(
      getSelectedCompositeAttributes(STATE_ATTRIBUTES_MONOLIST)[0],
    ).toEqual(ATTRIBUTE_MONOLIST_COMPOSITE.nestedAttribute.compositeAttributes[0]);
    const noCompAttr = {
      contentType: {
        selected: {
          attributes: 'ey',
          attributeSelected: {
            code: 'mlstc',
            type: 'Monolist',
            name: 'Monolist Composite',
            nestedAttribute: {
              code: 'mlstc',
              type: 'Text',
              nestedAttribute: null,
              compositeAttributes: null,
            },
          },
        },
      },
    };
    expect(getSelectedCompositeAttributes(noCompAttr)).toEqual([]);
  });

  it('test #2 on verifying getContentTypeAttributesIdList returning list except selected attribute', () => {
    const LIST_SELECTED2 = {
      contentType: {
        list: GET_CONTENT_TYPES_RESPONSE_OK,
        selected: {},
        attributes: {
          list: CONTENT_TYPES_ATTRIBUTES,
          selected: { code: 'Monolist' },
        },
      },
    };
    const res = getContentTypeAttributesIdList(LIST_SELECTED2);
    expect(res).toEqual([
      'Enumerator',
      'Monotext',
      'Text',
    ]);
  });

  it('verify getMonolistAttributeType', () => {
    const LIST_SELECTED3 = {
      contentType: {
        list: GET_CONTENT_TYPES_RESPONSE_OK,
        selected: {
          attributeSelected: ATTRIBUTE_MONOLIST_COMPOSITE,
        },
      },
    };
    const res = getMonolistAttributeType(LIST_SELECTED3);
    expect(res).toEqual('Composite');

    const LIST_SELECTED4 = {
      contentType: {
        list: [],
        selected: {
          attributeSelected: {
            code: 'mlstc',
            type: 'Monolist',
            name: 'Monolist Composite',
            nestedAttribute: {
              code: 'mlstc',
              type: '',
              nestedAttribute: {},
              compositeAttributes: null,
            },
          },
        },
      },
    };

    const res2 = getMonolistAttributeType(LIST_SELECTED4);
    expect(res2).toEqual('');
  });

  it('verify getIsMonolistCompositeAttributeType', () => {
    const res = getIsMonolistCompositeAttributeType(STATE_ATTRIBUTES_MONOLIST);
    expect(res).toEqual(true);
  });

  it('verify getNewAttributeComposite', () => {
    const LIST_SELECTED4 = {
      contentType: {
        list: GET_CONTENT_TYPES_RESPONSE_OK,
        selected: { newAttributeComposite: 'boi' },
      },
    };
    const res = getNewAttributeComposite(LIST_SELECTED4);
    expect(res).toEqual('boi');
  });
});
