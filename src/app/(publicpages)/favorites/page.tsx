"use client";

import { useLikeandFav } from "@/context/LikeandFavContext";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/Product/ProductCard";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useLikeandFav();
  const { products, isLoading } = useProducts();

  const favoriteProducts = products.filter((p) =>
    favorites.some((f) => f.id === p.id)
  );

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-(--text-secondary)">Загрузка...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          ИЗБРАННОЕ
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary)">
          {favoriteProducts.length} товар(ов) в избранном
        </p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-(--border)">
          <Heart size={48} className="text-(--text-muted) mb-4" />
          <p className="text-xl font-bold text-(--text-secondary)">
            Нет избранных товаров
          </p>
          <p className="mt-2 text-(--text-muted)">
            Добавьте товары в избранное из каталога
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
