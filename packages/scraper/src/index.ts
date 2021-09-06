import 'reflect-metadata';
import 'process';
import { iocContainer, TYPES } from "./ioc";
import { MensaScraper } from "./scraper";

console.log('Hello world from node.js');

async function fetchMensa(): Promise<void> {
  const scraper = iocContainer.get<MensaScraper>(TYPES.MensaScraper);
  const html = await scraper.fetchPage();

  console.log(html);

  process.exit();
}

void fetchMensa();

