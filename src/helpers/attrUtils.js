import moment from 'moment';

import {
  TYPE_COMPOSITE, TYPE_LIST, TYPE_MONOLIST,
  TYPE_DATE, TYPE_TIMESTAMP, TYPE_BOOLEAN,
  TYPE_CHECKBOX, TYPE_THREESTATE, TYPE_TEXT,
  TYPE_LONGTEXT, TYPE_HYPERTEXT,
} from 'state/content-type/const';

// eslint-disable-next-line import/prefer-default-export
export const getAttrInitialValue = (attr) => {
  const { type, code, compositeAttributes = [] } = attr;
  const initialValue = { code };
  switch (type) {
    case TYPE_COMPOSITE:
      initialValue.compositeelements = compositeAttributes.map(getAttrInitialValue);
      break;
    case TYPE_LIST:
      initialValue.listelements = {
        en: [],
      };
      break;
    case TYPE_MONOLIST:
      initialValue.elements = [];
      break;
    case TYPE_DATE:
    case TYPE_TIMESTAMP:
      initialValue.value = moment().format('DD/MM/YYYY');
      break;
    case TYPE_BOOLEAN:
    case TYPE_CHECKBOX:
      initialValue.value = 'false';
      break;
    case TYPE_THREESTATE:
      initialValue.value = 'none';
      break;
    case TYPE_TEXT:
    case TYPE_LONGTEXT:
    case TYPE_HYPERTEXT:
      initialValue.values = {
        en: '',
      };
      break;
    default:
      initialValue.value = '';
  }

  return initialValue;
};
