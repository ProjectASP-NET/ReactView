"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CompareProvider } from "@/context/CompareContext";
import { LikeandFavProvider } from "@/context/LikeandFavContext";
import { FloatingAuthButton } from "@/components/Buttons/FloatingAuthButton";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
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
  );
}