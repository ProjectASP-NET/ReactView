import { getRequestConfig } from "next-intl/server";
import { routing, locales } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as typeof locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../languages/${locale}.json`)).default,
  };
});
