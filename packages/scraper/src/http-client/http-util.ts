const HTTP_HEADER_COOKIE = 'cookie';
const LIST_SEPARATOR = ';';

/**
 * Build the HTTP cookie header for given {@code cookies}.
 * @param cookies List of cookies
 * @return Http cookie header or undefined if no cookies are given
 */
export const buildCookieHeader = (cookies?: [string, string][]): Record<string, string> | undefined => {
  if (cookies === undefined || cookies.length === 0) {
    return undefined;
  }

  const headerString = cookies.map(([key, value]) => `${key}=${value}`).join(LIST_SEPARATOR);

  return {
    [HTTP_HEADER_COOKIE]: headerString,
  };
};
