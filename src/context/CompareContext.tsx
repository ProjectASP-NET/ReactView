"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Product } from "@/types/product.types";

interface CompareContextType {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  count: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addToCompare = useCallback((product: Product) => {
    setItems((current) => {
      if (current.length >= 4) return current;
      
      const currentType = current[0]?.type ?? null;
      if (currentType && currentType !== product.type) return current;
      
      if (current.some((item) => item.id === product.id)) return current;
      
      return [...current, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  }, []);

  const toggleCompare = useCallback((product: Product) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }
      
      if (current.length >= 4) return current;
      
      const currentType = current[0]?.type ?? null;
      if (currentType && currentType !== product.type) return current;
      
      return [...current, product];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  const isInCompare = useCallback(
    (productId: string) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const count = useMemo(() => items.length, [items]);

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        clearCompare,
        isInCompare,
        count,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
