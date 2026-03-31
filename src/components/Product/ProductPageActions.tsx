"use client";

import { Heart, Star } from "lucide-react";
import { Product } from "@/types/Mockdata";
import { useLikeandFav } from "@/context/LikeandFavContext";

interface ProductPageActionsProps {
  product: Product;
}

export function ProductPageActions({ product }: ProductPageActionsProps) {
  const { toggleLike, toggleFavorite, isLiked, isFavorite } = useLikeandFav();
  const liked = isLiked(product.id);
  const favorited = isFavorite(product.id);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => toggleLike(product.id)}
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
          liked
            ? "bg-red-500 text-white"
            : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-red-500 hover:text-red-500"
        }`}
      >
        <Heart size={18} fill={liked ? "currentColor" : "none"} />
        <span>{product.LikeCount + (liked ? 1 : 0)}</span>
      </button>
      <button
        onClick={() => toggleFavorite(product)}
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
          favorited
            ? "bg-yellow-500 text-black"
            : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-yellow-500 hover:text-yellow-500"
        }`}
      >
        <Star size={18} fill={favorited ? "currentColor" : "none"} />
        {favorited ? "В избранном" : "В избранное"}
      </button>
    </div>
  );
}
