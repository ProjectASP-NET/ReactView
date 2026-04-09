"use client";

import { useLikeandFav } from "@/context/LikeandFavContext";
import { MOCK_PRODUCTS } from "@/types/Products";
import { ProductCard } from "@/components/Product/ProductCard";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { ThumbsUp } from "lucide-react";

export default function LikesPage() {
  const { likedProducts } = useLikeandFav();

  const likedProductIds = Array.from(likedProducts);
  const likedProductsList = MOCK_PRODUCTS.filter((p) => likedProductIds.includes(p.id));

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          МОИ ЛАЙКИ
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary)">
          {likedProductsList.length} лайкнутых товаров
        </p>
      </div>

      {likedProductsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {likedProductsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-(--border)">
          <ThumbsUp size={48} className="text-(--text-muted) mb-4" />
          <p className="text-xl font-bold text-(--text-secondary)">
            Нет лайкнутых товаров
          </p>
          <p className="mt-2 text-(--text-muted)">
            Поставьте лайк товарам в каталоге
          </p>
          <Link
            href={PAGES.CATALOG}
            className="mt-6 rounded-full bg-(--text-primary) px-8 py-3 text-sm font-bold text-(--background) transition-transform hover:scale-105"
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </main>
  );
}
