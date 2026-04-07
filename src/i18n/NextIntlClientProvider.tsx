"use client";

import { NextIntlClientProvider as IntlProvider } from "next-intl";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export function NextIntlClientProvider({ children, locale, messages }: Props) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
