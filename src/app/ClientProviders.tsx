"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CompareProvider } from "@/context/CompareContext";
import { LikeandFavProvider } from "@/context/LikeandFavContext";
import { UserProvider } from "@/context/UserContext";
import { FloatingAuthButton } from "@/components/Buttons/FloatingAuthButton";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary";

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Что-то пошло не так</h2>
      <p className="text-(--foreground)/70 mb-4">Попробуйте обновить страницу</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-(--primary) text-white px-4 py-2 rounded-lg"
      >
        Обновить
      </button>
    </div>
  );
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <CompareProvider>
              <LikeandFavProvider>
                {children}
                <FloatingAuthButton />
              </LikeandFavProvider>
            </CompareProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
