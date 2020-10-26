import {
  equalDate, equalNumber, equalString,
  rangeEndDate, rangeEndNumber, rangeEndString,
  rangeStartDate, rangeStartNumber, rangeStartString,
  regex, linkValidate, getAttrValidators,
} from 'helpers/attrValidation';
import { TYPE_EMAIL, TYPE_TEXT } from 'state/content-type/const';

describe('helpers/attrValidation', () => {
  describe('equalDate', () => {
    const date = '21/11/2019';

    it('should return a message if date is not equal to value', () => {
      const result = equalDate(date)('20/11/2019');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if date is equal to value', () => {
      const result = equalDate(date)('21/11/2019');
      expect(result).toBeUndefined();
    });
  });

  describe('equalNumber', () => {
    const num = 123;

    it('should return a message if num is not equal to value', () => {
      const result = equalNumber(num)(121);
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if num is equal to value', () => {
      const result = equalNumber(num)(123);
      expect(result).toBeUndefined();
    });
  });

  describe('equalString', () => {
    const str = 'test';

    it('should return a message if str is not equal to value', () => {
      const result = equalString(str)('foo');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if str is equal to value', () => {
      const result = equalString(str)('test');
      expect(result).toBeUndefined();
    });
  });

  describe('rangeEndDate', () => {
    const date = '21/11/2019';

    it('should return a message if date is more than value', () => {
      const result = rangeEndDate(date)('22/11/2019');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if date is more than or equal to value', () => {
      const result1 = rangeEndDate(date)('21/11/2019');
      const result2 = rangeEndDate(date)('20/11/2019');
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('rangeEndNumber', () => {
    const num = 123;

    it('should return a message if num is more than value', () => {
      const result = rangeEndNumber(num)(124);
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if num is more than or equal to value', () => {
      const result1 = rangeEndNumber(num)(123);
      const result2 = rangeEndNumber(num)(122);
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('rangeEndString', () => {
    const str = '123';

    it('should return a message if str is more than value', () => {
      const result = rangeEndString(str)('124');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if str is more than or equal to value', () => {
      const result1 = rangeEndString(str)('123');
      const result2 = rangeEndString(str)('122');
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('rangeStartDate', () => {
    const date = '21/11/2019';

    it('should return a message if date is more than value', () => {
      const result = rangeStartDate(date)('20/11/2019');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if date is less than or equal to value', () => {
      const result1 = rangeStartDate(date)('21/11/2019');
      const result2 = rangeStartDate(date)('22/11/2019');
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('rangeStartNumber', () => {
    const num = 123;

    it('should return a message if num is more than value', () => {
      const result = rangeStartNumber(num)(122);
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if num is less than or equal to value', () => {
      const result1 = rangeStartNumber(num)(123);
      const result2 = rangeStartNumber(num)(124);
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('rangeStartString', () => {
    const str = '123';

    it('should return a message if str is more than value', () => {
      const result = rangeStartString(str)('122');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if str is less than or equal to value', () => {
      const result1 = rangeStartString(str)('123');
      const result2 = rangeStartString(str)('124');
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('regex', () => {
    const regexStr = '^test[0-9]';

    it('should return a message if value does not match regex', () => {
      const result = regex(regexStr)('atest');
      expect(result.type.displayName).toBe('FormattedMessage');
    });

    it('should return undefined if value matches regex', () => {
      const result = regex(regexStr)('test5');
      expect(result).toBeUndefined();
    });
  });

  describe('linkValidate', () => {
    it('should return a message if link value is empty', () => {
      const result = linkValidate('en')({
        value: {},
        values: { en: 'test' },
      });
      expect(result.type.displayName).toBe('FormattedMessage');
    });
    it('should return a message if link values is empty', () => {
      const result = linkValidate('en')({
        value: { symbolicDestination: 'test' },
        values: {},
      });
      expect(result.type.displayName).toBe('FormattedMessage');
    });
    it('should return undefined if link has both value and values', () => {
      const result = linkValidate('en')({
        value: { symbolicDestination: 'test' },
        values: { en: 'test' },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getAttrValidators', () => {
    const validationRules = {
      equalString: () => {},
      regex: () => {},
    };

    it('should return length of rules array same as length of validationRules if attr type is not email', () => {
      const validaionArray = getAttrValidators(validationRules, TYPE_TEXT);
      expect(validaionArray.length).toBe(Object.keys(validationRules).length);
    });

    it('should return length of rules array minus 1 of validationRules if attr type is email and validator is regex', () => {
      const validaionArray = getAttrValidators(validationRules, TYPE_EMAIL);
      expect(validaionArray.length).toBe(Object.keys(validationRules).length - 1);
    });

    it('should return length of rules array same as length of validationRules if attr type is email and validator is not regex', () => {
      const validaionArray = getAttrValidators({
        equalString: () => {},
        rangeStartString: () => {},
      }, TYPE_EMAIL);
      expect(validaionArray.length).toBe(Object.keys(validationRules).length);
    });
  });
});
