"use client";

import { Heart } from "lucide-react";
import { useLikeandFav } from "@/context/LikeandFavContext";

interface LikeButtonProps {
  productId: string;
  likeCount: number;
  size?: "sm" | "md";
}

export function LikeButton({ productId, likeCount, size = "md" }: LikeButtonProps) {
  const { toggleLike, isLiked } = useLikeandFav();
  const liked = isLiked(productId);

  const iconSize = size === "sm" ? 14 : 18;
  const padding = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <button
      onClick={() => toggleLike(productId)}
      className={`flex items-center gap-1.5 rounded-full font-medium transition-colors ${
        liked
          ? "bg-red-500 text-white"
          : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-red-500 hover:text-red-500"
      } ${padding}`}
    >
      <Heart size={iconSize} fill={liked ? "currentColor" : "none"} />
      <span>{likeCount}</span>
    </button>
  );
}
