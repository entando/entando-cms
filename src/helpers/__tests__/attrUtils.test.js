import { getDateTimeObjFromStr, getAttrInitialValue } from 'helpers/attrUtils';
import { TYPE_BOOLEAN, TYPE_CHECKBOX, TYPE_THREESTATE } from 'state/content-type/const';

describe('helpers/attrUtils', () => {
  describe('getAttrInitialValue', () => {
    it('should return correct default initial value', () => {
      const attribute = { type: 'test', code: 'test' };
      expect(getAttrInitialValue(attribute)).toEqual({
        code: attribute.code,
        value: '',
      });
    });
    it('should return correct initial value for Boolean and Checkbox attributes', () => {
      const attribute = { type: TYPE_BOOLEAN, code: 'test' };
      const expectedValue = {
        code: attribute.code,
        value: 'false',
      };
      expect(getAttrInitialValue(attribute)).toEqual(expectedValue);
      attribute.type = TYPE_CHECKBOX;
      expect(getAttrInitialValue(attribute)).toEqual(expectedValue);
    });
    it('should return correct initial value for Threestate attributes', () => {
      const attribute = { type: TYPE_THREESTATE, code: 'test' };
      const expectedValue = {
        code: attribute.code,
        value: 'none',
      };
      expect(getAttrInitialValue(attribute)).toEqual(expectedValue);
    });
  });

  describe('getDateTimeObjFromStr', () => {
    it('should return correct object', () => {
      const dateStr = '2019-11-26 12:20:05';
      expect(getDateTimeObjFromStr(dateStr)).toEqual({
        date: '2019-11-26',
        hours: '12',
        minutes: '20',
        seconds: '05',
      });
    });
  });
});
