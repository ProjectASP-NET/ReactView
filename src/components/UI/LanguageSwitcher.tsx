"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useEffect } from 'react';

const LOCALE_COOKIE = 'next-locale';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${LOCALE_COOKIE}=`))
      ?.split('=')[1];

    if (savedLocale && savedLocale !== locale && routing.locales.includes(savedLocale as typeof routing.locales[number])) {
      window.location.reload();
    }
  }, [locale]);

  const handleSwitch = (newLocale: string) => {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=${maxAge}; SameSite=Lax`;
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-(--border) bg-(--card-bg) p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full transition-colors ${
            locale === loc
              ? "bg-(--text-secondary) text-(--background)"
              : "text-(--text-secondary) hover:bg-(--card-hover)"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
