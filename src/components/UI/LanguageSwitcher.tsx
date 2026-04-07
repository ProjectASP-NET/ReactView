"use client";

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const locales = ['ru', 'en', 'ro'] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleSwitch = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-(--border) bg-(--card-bg) p-1">
      {locales.map((loc) => (
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
