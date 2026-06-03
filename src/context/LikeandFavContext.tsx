"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types/product.types";
import { useUser } from "./UserContext";
import { useProducts } from "./ProductContext";
import { InteractionService } from "@/services/interaction.service";

interface LikeandFavContextType {
  likedProducts: Set<string>;
  favorites: Set<string>;
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

function getStoredFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export function LikeandFavProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading: authLoading } = useUser();
  const { updateLikeCount, productsDTO } = useProducts();
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (authLoading) return;

    if (isLoggedIn) {
      InteractionService.getMyLikes().then((ids) => {
        setLikedProducts(new Set(ids.map((id) => id.toString())));
      }).catch(() => setLikedProducts(new Set()));
      InteractionService.getMyFavorites().then((ids) => {
        setFavorites(new Set(ids.map((id) => id.toString())));
      }).catch(() => setFavorites(new Set()));
    } else {
      setLikedProducts(getStoredLikes());
      setFavorites(getStoredFavorites());
    }
  }, [isLoggedIn, authLoading]);

  useEffect(() => {
    if (isLoggedIn) return;
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify([...likedProducts]));
  }, [likedProducts, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) return;
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([...favorites]));
  }, [favorites, isLoggedIn]);

  const toggleLike = useCallback((productId: string) => {
    if (isLoggedIn) {
      InteractionService.toggleLike(Number(productId)).then((res) => {
        setLikedProducts((current) => {
          const next = new Set(current);
          if (res.isLiked) {
            next.add(productId);
          } else {
            next.delete(productId);
          }
          return next;
        });
        updateLikeCount(Number(productId), res.likeCount);
      }).catch((err) => console.error("Toggle like failed:", err));
    } else {
      const wasLiked = likedProducts.has(productId);
      setLikedProducts((current) => {
        const next = new Set(current);
        if (next.has(productId)) {
          next.delete(productId);
        } else {
          next.add(productId);
        }
        return next;
      });
      const productDTO = productsDTO.find(p => p.id === Number(productId));
      const currentCount = productDTO?.likeCount ?? 0;
      updateLikeCount(Number(productId), currentCount + (wasLiked ? -1 : 1));
    }
  }, [isLoggedIn, updateLikeCount, likedProducts, productsDTO]);

  const toggleFavorite = useCallback((product: Product) => {
    const idStr = product.id;
    if (isLoggedIn) {
      InteractionService.toggleFavorite(Number(idStr)).then((res) => {
        setFavorites((current) => {
          const next = new Set(current);
          if (res.isFavorited) {
            next.add(idStr);
          } else {
            next.delete(idStr);
          }
          return next;
        });
      }).catch((err) => console.error("Toggle favorite failed:", err));
    } else {
      setFavorites((current) => {
        const next = new Set(current);
        if (next.has(idStr)) {
          next.delete(idStr);
        } else {
          next.add(idStr);
        }
        return next;
      });
    }
  }, [isLoggedIn]);

  const isLiked = useCallback(
    (productId: string) => likedProducts.has(productId),
    [likedProducts]
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.has(productId),
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
