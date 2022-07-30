import { buildCookieHeader } from '../../src/http-client';

describe('http-util', () => {
  describe('cookie header', () => {
    it('should build the cookie header', () => {
      // given
      const key = 'foo';
      const value = 'bar';

      // when
      const result = buildCookieHeader([[key, value]]);

      // then
      expect(result).toEqual({ cookie: `${key}=${value}` });
    });

    it('should not build the cookie header', () => {
      // when
      const result = buildCookieHeader();

      // then
      expect(result).toBeUndefined();
    });
  });
});
