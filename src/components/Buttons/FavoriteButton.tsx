"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Product } from "@/types/Mockdata";
import { useLikeandFav } from "@/context/LikeandFavContext";

interface FavoriteButtonProps {
  product: Product;
  size?: "sm" | "md";
}

export function FavoriteButton({ product, size = "md" }: FavoriteButtonProps) {
  const t = useTranslations("Product");
  const { toggleFavorite, isFavorite } = useLikeandFav();
  const favorited = isFavorite(product.id);

  const iconSize = size === "sm" ? 14 : 18;
  const padding = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <button
      onClick={() => toggleFavorite(product)}
      className={`flex items-center gap-1.5 rounded-full font-medium transition-colors ${
        favorited
          ? "bg-yellow-500 text-black"
          : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-yellow-500 hover:text-yellow-500"
      } ${padding}`}
    >
      <Star size={iconSize} fill={favorited ? "currentColor" : "none"} />
      <span>{favorited ? t("inFavorite") : t("addToFavorite")}</span>
    </button>
  );
}