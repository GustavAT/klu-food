import { Dish } from '@klu-food/shared';
import { HTMLElement } from 'node-html-parser';

export interface Processor {
  /**
   * Extract menus from given page source.
   * @param pageSource HTML source of a web-page
   */
  process(pageSource: HTMLElement): Dish[];
}
