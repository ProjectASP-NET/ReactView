"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const LIKES_KEY = "userLikes";
const FAVORITES_KEY = "userFavorites";

interface InteractionServiceType {
  isLiked: (productId: string) => boolean;
  toggleLike: (productId: string, currentCount: number) => { 
    isLiked: boolean; 
    newCount: number 
  };
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => boolean;
  getLikedProducts: () => string[];
  getFavoriteProducts: () => string[];
}

const InteractionServiceContext = createContext<InteractionServiceType | null>(null);

export function InteractionServiceProvider({ children }: { children: ReactNode }) {
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  const [userFavorites, setUserFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedLikes = localStorage.getItem(LIKES_KEY);
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedLikes) setUserLikes(JSON.parse(savedLikes));
    if (savedFavorites) setUserFavorites(JSON.parse(savedFavorites));
  }, []);

  const saveLikes = (likes: Record<string, boolean>) => {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    setUserLikes(likes);
  };

  const saveFavorites = (favorites: Record<string, boolean>) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    setUserFavorites(favorites);
  };

  const isLiked = (productId: string) => !!userLikes[productId];

  const toggleLike = (productId: string, currentCount: number) => {
    const newLikes = { ...userLikes };
    const wasLiked = !!newLikes[productId];
    
    if (wasLiked) {
      delete newLikes[productId];
    } else {
      newLikes[productId] = true;
    }
    
    saveLikes(newLikes);
    return {
      isLiked: !wasLiked,
      newCount: wasLiked ? currentCount - 1 : currentCount + 1
    };
  };

  const isFavorite = (productId: string) => !!userFavorites[productId];

  const toggleFavorite = (productId: string) => {
    const newFavorites = { ...userFavorites };
    const wasFavorite = !!newFavorites[productId];
    
    if (wasFavorite) {
      delete newFavorites[productId];
    } else {
      newFavorites[productId] = true;
    }
    
    saveFavorites(newFavorites);
    return !wasFavorite;
  };

  const getLikedProducts = () => Object.keys(userLikes);
  const getFavoriteProducts = () => Object.keys(userFavorites);

  return (
    <InteractionServiceContext.Provider value={{
      isLiked,
      toggleLike,
      isFavorite,
      toggleFavorite,
      getLikedProducts,
      getFavoriteProducts
    }}>
      {children}
    </InteractionServiceContext.Provider>
  );
}

export function useInteractionService() {
  const context = useContext(InteractionServiceContext);
  if (!context) {
    throw new Error("useInteractionService must be used within InteractionServiceProvider");
  }
  return context;
}
