"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CompareProvider } from "@/context/CompareContext";
import { LikeandFavProvider } from "@/context/LikeandFavContext";
import { FloatingAuthButton } from "@/components/Buttons/FloatingAuthButton";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary";
import { NextIntlClientProvider, useMessages, useLocale } from "next-intl";

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h2 className="text-2xl font-bold text-error mb-4">Something went wrong</h2>
      <p className="text-base-content/70 mb-4">Try refreshing the page</p>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-primary"
      >
        Refresh
      </button>
    </div>
  );
}

function ProvidersInner({ children }: { children: ReactNode }) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <ThemeProvider>
          <CartProvider>
            <CompareProvider>
              <LikeandFavProvider>
                {children}
                <FloatingAuthButton />
              </LikeandFavProvider>
            </CompareProvider>
          </CartProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return <ProvidersInner>{children}</ProvidersInner>;
}
