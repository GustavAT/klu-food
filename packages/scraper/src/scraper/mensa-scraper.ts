import { HTMLElement, parse } from 'node-html-parser';
import { inject, injectable } from 'inversify';
import { HttpClient } from '../http-client';
import { Scraper } from './scraper';
import { TYPES } from '../ioc';
import log4js from 'log4js';

const MENSA_URL = 'https://www.mensen.at/';
const MENSA_LOCATION_KEY = 'mensenExtLocation';
const MENSA_LOCATION_VALUE = '45';

const LOGGER = log4js.getLogger('scraper');

/**
 * HTML scraper for the Mensa website.
 */
@injectable()
export class MensaScraper implements Scraper {
  constructor(@inject(TYPES.HttpClient) private httpClient: HttpClient) {}

  async fetchPage(): Promise<HTMLElement> {
    LOGGER.info('Start scraping for Mensa');

    const cookie: [string, string][] = [[MENSA_LOCATION_KEY, MENSA_LOCATION_VALUE]];

    const rawHtml = await this.httpClient.get(MENSA_URL, cookie);

    return parse(rawHtml);
  }
}
