import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ru', 'en', 'ro'],
  defaultLocale: 'ru',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(ru|en|ro)/:path*']
};
