import type { PropsWithChildren } from "react";
import { Header } from "@/components/Layout/Header";
import AgeModal from "@/components/Modal/AgeModal";
import { Footer } from "@/components/Layout/Footer";
import { NextIntlClientProvider } from "@/i18n/NextIntlClientProvider";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  const messages = (await import(`../../../languages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AgeModal />
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
export const metadata: Metadata = {
 title : {
  template : '%s - D&DLiquid',
  default : ''
 }, 
 description : 'D&DLiquid'
};
