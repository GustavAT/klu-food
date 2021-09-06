import { inject, injectable } from 'inversify';
import { Scraper } from './scraper';
import { TYPES } from '../ioc';
import { HttpClient } from '../http-client';

const MENSA_URL = 'https://www.mensen.at/';
const MENSA_LOCATION_KEY = 'mensenExtLocation';
const MENSA_LOCATION_VALUE = '45';

/**
 * HTML scraper for the Mensa website.
 */
@injectable()
export class MensaScraper implements Scraper {
  constructor(@inject(TYPES.HttpClient) private httpClient: HttpClient) {}

  async fetchPage(): Promise<string> {
    const cookie: [string, string][] = [[MENSA_LOCATION_KEY, MENSA_LOCATION_VALUE]];
    return this.httpClient.get(MENSA_URL, cookie);
  }
}
