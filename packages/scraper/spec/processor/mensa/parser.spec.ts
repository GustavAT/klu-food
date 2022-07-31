import { MensaDish, parseDish } from '../../../src/processor/mensa/parser';

export const validTestCases: { input: string[]; expected: MensaDish }[] = [
  {
    input: [
      'Fisolencremesuppe',
      'Kartoffeltaschen gefüllt mit Frischkäse (*)',
      'auf bunter Salatmischung, Dip',
      '(A,F,G,L,O) € 5,70',
    ],
    expected: {
      mainDish: 'Kartoffeltaschen gefüllt mit Frischkäse (*)',
      sideDish: 'auf bunter Salatmischung, Dip',
      allergenes: ['A', 'F', 'G', 'L', 'O'],
      price: '5,70',
      vegan: false,
    },
  },
];

describe('mensa-parser', () => {
  describe('parse dish', () => {
    it('should do something', () => {
      expect(true).toBeTruthy();
    });

    it.each(validTestCases)('should parse the dish correctly', ({ input, expected }) => {
      // when
      const result = parseDish(input);

      // then
      expect(result).toStrictEqual(expected);
    });
  });
});
