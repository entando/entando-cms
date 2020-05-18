import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { get, isEmpty, isUndefined } from 'lodash';
import {
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_COMPOSITE,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_TEXT,
} from 'state/content-type/const';

const NO_ATTRIBUTE_FOR_TYPE_LIST = [
  TYPE_LIST,
  TYPE_COMPOSITE,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_MONOLIST,
  TYPE_TEXT,
];

const NO_ATTRIBUTE_FOR_TYPE_MONOLIST = [TYPE_LIST, TYPE_MONOLIST];

export const getContentTypeState = state => state.apps.cms.contentType;
export const getContentTypeIdList = state => state.apps.cms.contentType.list;
export const getContentTypeMap = state => state.apps.cms.contentType.map;
export const getSelectedContentType = state => state.apps.cms.contentType.selected;
export const getContentTypeAttributes = state => state.apps.cms.contentType.attributes;
const getContentTypeReferences = state => state.apps.cms.contentType.references;

export const getContentTypeSelectedAttribute = state => state.apps.cms
  . contentType.attributes.selected;
export const getContentTypeParentSelectedAttribute = state => state.apps.cms
  . contentType.attributes.parentSelected;
export const getContentTypeSelectedAttributeType = state => state.apps.cms
  . contentType.attributes.selected.listAttribute;
export const getContentTypeSelectedAttributeSearchable = state => state.apps.cms
  . contentType.attributes.selected.searchableOptionSupported;
export const getContentTypeSelectedAttributeIndexable = state => state.apps.cms
  . contentType.attributes.selected.indexableOptionSupported;
export const getContentTypeSelectedAttributeAllowedRoles = state => state.apps.cms
  . contentType.attributes.selected.allowedRoles;
export const getContentTypeSelectedAttributeallowedDisablingCodes = state => state.apps.cms
  . contentType.attributes.selected.allowedDisablingCodes;
export const getContentTypeSelectedAttributeIsList = state => get(state.apps.cms.contentType.attributes.selected, 'listAttribute');
export const getSelectedContentTypeAttributes = state => get(state.apps.cms.contentType.selected, 'attributes');
export const getSelectedAttributeType = state => get(state.apps.cms.contentType.selected, 'attributeSelected.type');
export const getSelectedAttributeNestedType = state => get(state.apps.cms.contentType.selected, 'attributeSelected.nestedAttribute.type');
export const getSelectedValidationRules = state => get(state.apps.cms.contentType.selected, 'attributeSelected.validationRules');
export const getContentTypeSelectedAttributeCode = state => get(state.apps.cms.contentType.attributes.selected, 'code');

export const getParentSelectedAttribute = createSelector(
  [getContentTypeParentSelectedAttribute],
  parentSelected => (
    parentSelected.length ? parentSelected[parentSelected.length - 1] : {}
  ),
);

export const getContentTypeList = createSelector(
  [getContentTypeMap, getContentTypeIdList],
  (contentTypeMap, idList) => idList.map(id => contentTypeMap[id]),
);

export const getContentTypeReferencesStatus = createSelector(
  [getContentTypeReferences],
  (ref) => {
    const { status } = ref;
    if (!isEmpty(status.toRefresh)) {
      return {
        type: 'warning',
        status: 'toRefresh',
        contentTypeCodes: status.toRefresh,
        count: status.toRefresh.length,
      };
    }
    return { type: 'success', status: 'ready', contentTypeCode: [] };
  },
);

export const getActionModeContentTypeSelectedAttribute = createSelector(
  [getSelectedContentType],
  sel => sel.actionMode,
);

export const getAttributeSelectFromContentType = createSelector(
  [getSelectedContentType],
  selected => selected.attributeSelected,
);

export const getSelectedCompositeAttributes = createSelector(
  [getAttributeSelectFromContentType],
  (attributeSelected) => {
    if (isUndefined(attributeSelected)) {
      return [];
    }
    const { type, nestedAttribute, compositeAttributes } = attributeSelected;
    const isMonolistComposite = type === TYPE_MONOLIST && nestedAttribute.type === TYPE_COMPOSITE;
    return isMonolistComposite ? nestedAttribute.compositeAttributes : compositeAttributes || [];
  },
);

const getList = (type, list) => {
  switch (type) {
    case TYPE_LIST:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_LIST.includes(f));
    case TYPE_MONOLIST:
    case TYPE_COMPOSITE:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_MONOLIST.includes(f));
    default:
      return list;
  }
};

export const getContentTypeAttributesIdList = createSelector(
  [getContentTypeAttributes, getAttributeSelectFromContentType],
  (attributes, attributeSelected) => {
    const {
      list,
      selected: { code },
    } = attributes;
    if (isUndefined(attributeSelected)) {
      return getList(code, list);
    }
    const { type } = attributeSelected;
    return getList(type, list);
  },
);

export const getMonolistAttributeType = createSelector(
  [getAttributeSelectFromContentType],
  attributeSelected => (attributeSelected.type === TYPE_MONOLIST ? attributeSelected.nestedAttribute.type : ''),
);

export const getIsMonolistCompositeAttributeType = createSelector(
  [getAttributeSelectFromContentType],
  attributeSelected => !!(
    attributeSelected
      && attributeSelected.type === TYPE_MONOLIST
      && attributeSelected.nestedAttribute.type === TYPE_COMPOSITE
  ),
);

export const getNewAttributeComposite = createSelector(
  [getSelectedContentType],
  sel => sel.newAttributeComposite,
);

export const getFormTypeValue = (state, formName) => formValueSelector(formName)(state, 'type');
