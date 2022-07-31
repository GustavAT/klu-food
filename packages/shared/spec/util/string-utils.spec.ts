import partition from '../../src/util/partition';

describe('string-utils', () => {
  describe('partition', () => {
    it.each([
      { input: ['a', 'b', '*', '*', 'c', '*', 'd'], expected: [['a', 'b'], ['c'], ['d']] },
      { input: ['*', '*'], expected: [] },
      { input: ['*', 'a', '*'], expected: [['a']] },
    ])('should partition $input correctly', ({ input, expected }) => {
      // when
      const result = partition(input, '*');

      // then
      expect(result).toEqual(expected);
    });
  });
});
