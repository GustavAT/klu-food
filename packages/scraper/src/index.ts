import 'process';
import 'reflect-metadata';
import { TYPES, iocContainer } from './ioc';
import { Dish } from '@klu-food/shared';
import { MensaScraper } from './scraper';

console.log('Hello world from node.js');

async function fetchMensa(): Promise<void> {
  const scraper = iocContainer.get<MensaScraper>(TYPES.MensaScraper);
  const html = await scraper.fetchPage();

  console.log(html);

  const xxx: Dish | undefined = undefined;

  console.log(xxx);

  process.exit();
}

void fetchMensa();
