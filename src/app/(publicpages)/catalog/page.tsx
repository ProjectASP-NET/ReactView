"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/Product/ProductCard";
import { Sort } from "@/components/Filters/Sort";
import { Filter } from "@/components/Filters/Filter";
import { SearchInput } from "@/components/Filters/SearchInput";
import { SortLogic } from "@/utility/SortLogic";
import { MOCK_PRODUCTS } from "@/types/Products";
import { Suspense } from "react";
import FadeIn from "@/components/UI/FadeIn";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary";

function CatalogErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold text-error mb-4">Ошибка загрузки каталога</h2>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-primary"
      >
        Обновить
      </button>
    </div>
  );
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const sortQuery = searchParams.get("sort") || "new";
  const filterQuery = searchParams.get("filter") || "all";
  const searchQuery = searchParams.get("search") || "";

  const getCatalogBg = () => {
    switch (filterQuery) {
      case "liquid":
        return "var(--catalog-gradient-liquid)";
      case "vape":
        return "var(--catalog-gradient-vape)";
      case "consumables":
        return "var(--catalog-gradient-consumables)";
      default:
        return "var(--catalog-gradient)";
    }
  };

  let filteredProducts =
    filterQuery === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.type === filterQuery);

  if (searchQuery.length >= 2) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand?.toLowerCase().includes(q) ?? false)
    );
  }

  const sortedProducts = SortLogic(filteredProducts, sortQuery);

  return (
    <div 
      className="min-h-[calc(100vh-200px)] rounded-3xl p-6 transition-all duration-500"
      style={{ background: getCatalogBg() }}
    >
      <div className="mb-8">
        <Suspense fallback={<div className="flex gap-2"><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /></div>}>
          <Filter />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-(--text-muted)">
          <p className="text-xl font-bold">Товары не найдены</p>
          <p className="text-sm">Попробуйте изменить параметры поиска или фильтрации</p>
        </div>
      )}
    </div>
  );
}

function CatalogLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-3xl bg-(--card-bg)"
        />
      ))}
    </div>
  );
}

export default function Catalog() {
  return (
    <FadeIn>
      <main className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover min-h-125"
        >
          <source src="/CatalogBG.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 border-b border-(--border) pb-8 md:flex-row md:items-end md:justify-between">
            <div className="rounded-2xl border border-(--border) bg-(--card-bg)/80 backdrop-blur-sm px-6 py-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                НАШ <span className="text-(--text-muted)">КАТАЛОГ</span>
              </h1>
              <p className="mt-4 text-lg text-(--text-secondary)">
                Премиальные жидкости и девайсы для истинных ценителей.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Suspense fallback={<div className="h-10 w-full max-w-md animate-pulse rounded-xl bg-(--card-bg)" />}>
                <SearchInput />
              </Suspense>
              <Suspense fallback={<div className="h-10 w-32 animate-pulse rounded-xl bg-(--card-bg)" />}>
                <Sort />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<CatalogLoading />}>
            <ErrorBoundary fallback={<CatalogErrorFallback />}>
              <CatalogContent />
            </ErrorBoundary>
          </Suspense>
        </div>
      </main>
    </FadeIn>
  );
}
