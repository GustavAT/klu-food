import { buildCookieHeader } from './http-util';
import get from 'axios';
import { injectable } from 'inversify';
import log4js from 'log4js';

const LOGGER = log4js.getLogger('http-client');

@injectable()
export class HttpClient {
  /**
   * Do a HTTP GET request to given {@code url} asynchronously.
   * @param url URL to web resource
   * @param cookies Optional cookies that are added to the HTTP header
   */
  public async get(url: string, cookies?: [string, string][]): Promise<string> {
    const httpHeader = buildCookieHeader(cookies);

    LOGGER.info('Fetch page source for %s with cookies %s', url, cookies);

    return get(url, { headers: httpHeader }).then((response) => response.data);
  }
}
