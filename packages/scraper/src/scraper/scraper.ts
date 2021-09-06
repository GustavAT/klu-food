export interface Scraper {
  /**
   * Fetch HTML content from a restaurants website.
   * @return HTML content
   */
  fetchPage(): Promise<string>;
}
