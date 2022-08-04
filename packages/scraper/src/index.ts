import 'process';
import 'reflect-metadata';
import { TYPES, iocContainer } from './ioc';
import { MensaScraper } from './scraper';

console.log('Hello world from node.js');

async function fetchMensa(): Promise<void> {
  const scraper = iocContainer.get<MensaScraper>(TYPES.MensaScraper);
  const html = await scraper.fetchPage();

  process.exit();
}

void fetchMensa();
