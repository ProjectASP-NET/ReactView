import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'en', 'ro'],
  defaultLocale: 'ru',
  localePrefix: 'never',
  localeDetection: false
});
