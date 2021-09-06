const HTTP_CLIENT_KEY = 'HttpClient';
const MENSA_SCRAPER_KEY = 'MensaScraper';

export const TYPES = {
  HttpClient: Symbol.for(HTTP_CLIENT_KEY),

  /* Scraper */
  MensaScraper: Symbol.for(MENSA_SCRAPER_KEY),
};
