"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types/Mockdata";

interface LikeandFavContextType {
  likedProducts: Set<string>;
  favorites: Product[];
  toggleLike: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isLiked: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
}

const LikeandFavContext = createContext<LikeandFavContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LIKES: "reactview_likes",
  FAVORITES: "reactview_favorites",
};

function getStoredLikes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LIKES);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function getStoredFavorites(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function LikeandFavProvider({ children }: { children: ReactNode }) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setLikedProducts(getStoredLikes());
    setFavorites(getStoredFavorites());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        STORAGE_KEYS.LIKES,
        JSON.stringify([...likedProducts])
      );
    }
  }, [likedProducts, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(favorites)
      );
    }
  }, [favorites, isHydrated]);

  const toggleLike = useCallback((productId: string) => {
    setLikedProducts((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }
      console.log(`Добавлено в избранное: ${product.name}`);
      return [...current, product];
    });
  }, []);

  const isLiked = useCallback(
    (productId: string) => likedProducts.has(productId),
    [likedProducts]
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.some((item) => item.id === productId),
    [favorites]
  );

  return (
    <LikeandFavContext.Provider
      value={{
        likedProducts,
        favorites,
        toggleLike,
        toggleFavorite,
        isLiked,
        isFavorite,
      }}
    >
      {children}
    </LikeandFavContext.Provider>
  );
}

export function useLikeandFav() {
  const context = useContext(LikeandFavContext);
  if (context === undefined) {
    throw new Error("useLikeandFav must be used within a LikeandFavProvider");
  }
  return context;
}
