"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Product } from "@/types/Mockdata";
import { useEffect } from "react";
import { AddtoCart } from "../Buttons/AddtoCartB";
import { X, Heart, Star } from "lucide-react";
import { useLikeandFav } from "@/context/LikeandFavContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const t = useTranslations("Product");
  const { toggleLike, toggleFavorite, isLiked, isFavorite } = useLikeandFav();
  const liked = isLiked(product.id);
  const favorited = isFavorite(product.id);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "liquid":
        return t("liquid");
      case "vape":
        return t("vape");
      case "consumables":
        return t("consumables");
      default:
        return type;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[320px] sm:max-w-120 md:max-w-160 lg:max-w-225
                    max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl 
                    border border-(--border) bg-(--section-bg) p-4 sm:p-6 md:p-8
                    shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-(--card-bg) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="relative w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-auto bg-black/50 rounded-xl sm:rounded-2xl flex items-center justify-center p-4 sm:p-6 border border-(--border)">
            <Image
              src={product.img}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
            <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-black/60 px-2 py-1 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-widest text-white backdrop-blur-md uppercase">
              {getTypeLabel(product.type)}
            </span>
          </div>

          <div className="flex flex-col justify-center sm:w-1/2">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-1 sm:mb-2">
              {product.brand}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-(--text-primary) mb-2 sm:mb-4">
              {product.name}
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary) mb-4 sm:mb-6 md:mb-8 line-clamp-3 sm:line-clamp-4">
              {product.description}
            </p>

            <div className="mt-auto">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-(--text-primary) mb-4 sm:mb-6">
                {product.price}{" "}
                <span className="text-sm sm:text-base md:text-lg font-light text-(--text-muted)">
                  MDL
                </span>
              </p>
              <AddtoCart productID={product.id} inStock={product.InStock} />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                    liked
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-(--border) bg-(--card-bg) text-(--text-secondary) hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  <Heart size={16} fill={liked ? "currentColor" : "none"} />
                  <span>{product.LikeCount}</span>
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                    favorited
                      ? "border-yellow-500 bg-yellow-500 text-black"
                      : "border-(--border) bg-(--card-bg) text-(--text-secondary) hover:border-yellow-500 hover:text-yellow-500"
                  }`}
                >
                  <Star size={16} fill={favorited ? "currentColor" : "none"} />
                  <span>{favorited ? t("inFavorite") : t("addToFavorite")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}