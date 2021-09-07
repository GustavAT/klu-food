import { Container } from 'inversify';
import { HttpClient } from '../http-client';
import { MensaScraper } from '../scraper';
import { TYPES } from './types';

const iocContainer = new Container();

iocContainer.bind<HttpClient>(TYPES.HttpClient).to(HttpClient);

iocContainer.bind<MensaScraper>(TYPES.MensaScraper).to(MensaScraper);

export { iocContainer };
