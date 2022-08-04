import { MensaDish, parseDish } from '../../../src/processor/mensa/parser';

const validTestCases: { input: string[]; expected: MensaDish }[] = [
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
      vegetarian: false,
    },
  },
  {
    input: ['Gebackenes Hühnerschnitzel ', 'mit Pommes frites und Preiselbeeren (A,C)', '€ 7,50'],
    expected: {
      mainDish: 'Gebackenes Hühnerschnitzel',
      sideDish: 'mit Pommes frites und Preiselbeeren',
      allergenes: ['A', 'C'],
      price: '7,50',
      vegetarian: false,
    },
  },
  {
    input: [
      'Gebratenes Zanderfilet mit Kräuterbutter',
      'dazu Mediterranes Grillgemüse und Petersilerdäpfel',
      '(A,D,G))',
      '€ 9,50',
    ],
    expected: {
      mainDish: 'Gebratenes Zanderfilet mit Kräuterbutter',
      sideDish: 'dazu Mediterranes Grillgemüse und Petersilerdäpfel',
      allergenes: ['A', 'D', 'G'],
      price: '9,50',
      vegetarian: false,
    },
  },
  {
    input: ['Vegane Indische Dal Linsen', 'mit Basmatireis und frischem Koriander (M)     € 5,30'],
    expected: {
      mainDish: 'Vegane Indische Dal Linsen',
      sideDish: 'mit Basmatireis und frischem Koriander',
      allergenes: ['M'],
      price: '5,30',
      vegetarian: true,
    },
  },
];

const invalidTestCases: { input: string[] }[] = [
  { input: [] },
  { input: [''] },
  { input: ['Broccolicremesuppe'] },
  { input: ['GESCHLOSSEN !!!!', 'Betriebsurlaub bis 28.August 2022'] },
  { input: ['Gebackenes Hühnerschnitzel ', 'mit Pommes frites und Preiselbeeren (A,C)'] },
  { input: ['Vegane Indische Dal Linsen', 'mit Basmatireis und frischem Koriander', '€ 5,30'] },
  { input: ['Schweizer Wurstsalat', '(A,G,L,M,O) € 5,90'] },
];

describe('mensa-parser', () => {
  describe('parse dish', () => {
    it.each(validTestCases)('should parse the dish correctly', ({ input, expected }) => {
      // when
      const result = parseDish(input);

      // then
      expect(result).toStrictEqual(expected);
    });

    it.each(invalidTestCases)('should return undefined', ({ input }) => {
      // when
      const result = parseDish(input);

      // then
      expect(result).toBeUndefined();
    });
  });
});
