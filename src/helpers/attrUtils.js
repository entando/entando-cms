import moment from 'moment';

import {
  TYPE_COMPOSITE, TYPE_LIST, TYPE_MONOLIST, TYPE_DATE, TYPE_TIMESTAMP, TYPE_BOOLEAN, TYPE_CHECKBOX, TYPE_THREESTATE,
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
    default:
      initialValue.value = '';
  }

  return initialValue;
};
