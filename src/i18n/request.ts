import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const LOCALE_COOKIE = 'next-locale';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  const resolvedLocale = locale && routing.locales.includes(locale as typeof routing.locales[number])
    ? locale
    : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});
