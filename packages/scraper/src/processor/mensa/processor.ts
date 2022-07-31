import { Dish } from '@klu-food/shared';
import { HTMLElement } from 'node-html-parser';
import { Processor } from '../processor';

/**
 * Processor for the Mensa website.
 */
export class MensaProcessor implements Processor {
  process(pageSource: HTMLElement): Dish[] {
    console.log(pageSource);

    return [];
  }
}
