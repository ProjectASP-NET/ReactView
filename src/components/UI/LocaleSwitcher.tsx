"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("common.localeSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const localeNames: Record<Locale, string> = {
    en: t("en"),
    ru: t("ru"),
    ro: t("ro"),
  };

  const currentLocale: Locale = locales.includes(locale) ? locale : "ru";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--card-bg) transition-colors"
        aria-label={t("label")}
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 py-2 rounded-xl border border-(--border) bg-(--card-bg) shadow-xl z-50 backdrop-blur-md">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  currentLocale === loc
                    ? "text-(--text-primary) bg-(--accent)/10 font-medium"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--card-hover)"
                }`}
              >
                {localeNames[loc]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}