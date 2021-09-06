import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { buildCookieHeader } from './http-util';

@injectable()
export class HttpClient {
  /**
   * Do a HTTP GET request to given {@code url} asynchronously.
   * @param url URL to web resource
   * @param cookies Optional cookies that are added to the HTTP header
   */
  public async get(url: string, cookies?: [string, string][]): Promise<string> {
    const httpHeader = buildCookieHeader(cookies);

    return fetch(url, { headers: httpHeader }).then((response) => response.text());
  }
}
