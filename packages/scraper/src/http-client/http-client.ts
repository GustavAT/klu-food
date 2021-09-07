import { buildCookieHeader } from './http-util';
import get from 'axios';
import { injectable } from 'inversify';

@injectable()
export class HttpClient {
  /**
   * Do a HTTP GET request to given {@code url} asynchronously.
   * @param url URL to web resource
   * @param cookies Optional cookies that are added to the HTTP header
   */
  public async get(url: string, cookies?: [string, string][]): Promise<string> {
    const httpHeader = buildCookieHeader(cookies);
    console.log(httpHeader);

    return get(url, { headers: httpHeader }).then((response) => response.data);
  }
}
