import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ClientProviders } from "@/app/ClientProviders";
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import AgeModal from '@/components/Modal/AgeModal';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientProviders>
        <AgeModal />
        <Header />
        {children}
        <Footer />
      </ClientProviders>
    </NextIntlClientProvider>
  );
}
