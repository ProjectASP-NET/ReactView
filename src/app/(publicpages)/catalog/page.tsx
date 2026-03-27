"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Sort } from "@/components/Sort";
import { Filter } from "@/components/Filter";
import { SortLogic } from "@/utility/SortLogic";
import { MOCK_PRODUCTS } from "@/types/Products";
import { Suspense } from "react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const sortQuery = searchParams.get("sort") || "new";
  const filterQuery = searchParams.get("filter") || "all";

  const filteredProducts =
    filterQuery === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.type === filterQuery);

  const sortedProducts = SortLogic(filteredProducts, sortQuery);

  return (
    <>
      <div className="mb-8">
        <Filter />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-white/40">
          <p className="text-xl font-bold">Товары не найдены</p>
          <p className="text-sm">Попробуйте изменить параметры фильтрации</p>
        </div>
      )}
    </>
  );
}

function CatalogLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-3xl bg-white/5"
        />
      ))}
    </div>
  );
}

export default function Catalog() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            НАШ <span className="text-white/50">КАТАЛОГ</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Премиальные жидкости и девайсы для истинных ценителей.
          </p>
        </div>
        <Suspense fallback={<div className="h-10 w-32 animate-pulse rounded-xl bg-white/5" />}>
          <Sort />
        </Suspense>
      </div>
      <Suspense fallback={<CatalogLoading />}>
        <CatalogContent />
      </Suspense>
    </main>
  );
}
