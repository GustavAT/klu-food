import { Container } from 'inversify';
import { HttpClient } from '../http-client';
import { TYPES } from './types';
import { MensaScraper } from '../scraper';

const iocContainer = new Container();

iocContainer.bind<HttpClient>(TYPES.HttpClient).to(HttpClient);

iocContainer.bind<MensaScraper>(TYPES.MensaScraper).to(MensaScraper);

export { iocContainer };
