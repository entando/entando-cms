import { swapItems } from 'helpers/arrayUtils';

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
});
