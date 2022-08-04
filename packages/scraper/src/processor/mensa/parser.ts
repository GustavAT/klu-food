import { Category, Dish, Restaurant, Weekday, partition } from '@klu-food/shared';
import { includes, isEmpty, isNil, join, map, split, toLower, trim } from 'lodash-es';
import { HTMLElement } from 'node-html-parser';
import log4js from 'log4js';

const LOGGER = log4js.getLogger('mensa-processor');

/**
 * @internal Visible for testing, internally used for parsing
 */
export interface MensaDish {
  mainDish: string;
  sideDish: string;
  price: string;
  allergenes: string[];
  vegetarian: boolean;
}

/**
 * The CSS selector for the weekly menu based on the "Monday" column.
 */
const WEEKLY_MENU_SELECTOR = '#leftColumn > div > div.menu-left > div > div > div.menu-category > div:nth-child(3)';

/**
 * Marks a line as 'soup'
 */
const MENU_SOUP = 'suppe';

/**
 * [side-dish] ([alergenes]) € [price]
 * [side-dish] any string up to the first parenthesis '('
 * [alergenes] any alphanumeric character, colon or space within the parenthesis '()'
 * [price] any price tag after the '€' symbol
 */
const REGEX_MENSA_DISH = /^(.*)\s+\(([\w,\s]*)\).*€\s([\d,]+)$/;
/**
 * (Most?) vegetarian mensa dishes contain the word 'vegan' or 'vegetarisch'.
 */
const REGEX_VEGETATIRAN_DISH = /vegan|vegetarisch/i;

/**
 * Parse the dish for mensa.
 *
 * The following rules apply:
 *
 * * Dish name is always
 *   * first line if there is no soup
 *   * second line if there is a soup
 * * Side-dish is in the following lines
 * * Allergense follow the side-dish
 *   * part of the side dish
 *   * own line
 *   * part of the price
 * * Price is the last line
 *   * part of the side-dish (+ allergenes)
 *   * part of the (stand-alone) allergenes
 *   * own line
 *
 * @param rawEntry Raw line entries of a dish
 */
export const parseDish = (rawEntry: string[]): MensaDish | undefined => {
  const lines = [...rawEntry];

  if (isEmpty(lines)) {
    return undefined;
  }

  const firstLine = lines[0];

  // Remove soup if present
  if (includes(toLower(firstLine), MENU_SOUP)) {
    lines.splice(0, 1);
  }

  // Missing main dish and side-dishes, alergenes and price
  if (lines.length < 2) {
    return undefined;
  }

  const mainDish = trim(lines[0]);
  if (isEmpty(mainDish)) {
    return undefined;
  }

  lines.splice(0, 1);

  const matches = join(lines, ' ').match(REGEX_MENSA_DISH);
  if (isNil(matches)) {
    return undefined;
  }

  const sideDish = trim(matches[1]);
  const alergenesString = trim(matches[2]);
  const price = trim(matches[3]);
  if (isEmpty(sideDish) || isEmpty(alergenesString) || isEmpty(price)) {
    return undefined;
  }

  const allergenes = map(split(alergenesString, ','), trim);
  const vegetarian = !isNil(mainDish.match(REGEX_VEGETATIRAN_DISH));

  return {
    mainDish,
    sideDish,
    allergenes,
    price,
    vegetarian,
  };
};

/**
 * Query the weekly menus.
 *
 * The column for weekday "Monday" will be used
 *
 * @param root Page source root
 */
export const queryWeeklyMenu = (root: HTMLElement): Dish[] => {
  const weeklyMenuElement = root.querySelector(WEEKLY_MENU_SELECTOR);

  if (isNil(weeklyMenuElement)) {
    LOGGER.warn('Could not query the weekly menu');

    return [];
  }

  const entiesRawList = weeklyMenuElement.textContent
    .split('\n') // Split by new-lines
    .map((line) => line.trim()) // Remove leading and trailing whitespaces
    .filter((line) => line.length !== 0) // Remove empty lines
    .splice(0, 1); // Remove the first "Wochen-Angebote" line
  const groupedEntries = partition(entiesRawList, '*').splice(0, 1); // Remove last group "Opening hours/AAU Teller/take-away info"

  const dishes: Dish[] = [];

  for (const rawEntry of groupedEntries) {
    const mensaDish = parseDish(rawEntry);

    if (isNil(mensaDish)) {
      LOGGER.warn('Could not parse menu %s', rawEntry);
      continue;
    }

    dishes.push({
      name: mensaDish.mainDish,
      sideDish: mensaDish.sideDish,
      allergens: mensaDish.allergenes,
      price: mensaDish.price,
      vegetarian: mensaDish.vegetarian,
      category: Category.MensaWeekly,
      restaurant: Restaurant.Mensa,
      weekday: Weekday.All,
    });
  }

  return dishes;
};
