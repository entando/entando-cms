import { swapItems, generateNumArray } from 'helpers/arrayUtils';

describe('helpers/arrayUtils', () => {
  describe('swapItems', () => {
    it('basic usage', () => {
      const toswap = swapItems([1, 2, 3], 1, true);
      expect(toswap[0]).toEqual(2);
    });

    it('another moveup', () => {
      const toswap = swapItems([1, 2, 3], 0, true);
      expect(toswap[0]).toEqual(1);
    });

    it('basic usage on movedown', () => {
      const toswap = swapItems([1, 2, 3], 1);
      expect(toswap[2]).toEqual(2);
    });

    it('another movedown', () => {
      const toswap = swapItems([1, 2, 3], 2);
      expect(toswap[2]).toEqual(3);
    });
  });

  describe('generateNumArray', () => {
    it('should return [0, 1, 2] when maxVal is 3', () => {
      const maxVal = 3;
      expect(generateNumArray(maxVal)).toEqual([0, 1, 2]);
    });
  });
});
