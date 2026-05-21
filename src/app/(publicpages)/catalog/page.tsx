"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/Product/ProductCard";
import { Sort } from "@/components/Filters/Sort";
import { Filter } from "@/components/Filters/Filter";
import { SearchInput } from "@/components/Filters/SearchInput";
import { Pagination } from "@/components/Filters/Pagination";
import { SortLogic } from "@/utility/SortLogic";
import { useProducts } from "@/context/ProductContext";
import { Suspense } from "react";
import FadeIn from "@/components/UI/FadeIn";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary";

function CatalogErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Ошибка загрузки каталога</h2>
      <button
        onClick={() => window.location.reload()}
        className="bg-(--primary) text-white px-4 py-2 rounded-lg"
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
  const { products, isLoading, error } = useProducts();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-(--text-secondary)">Загрузка продуктов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 text-lg font-bold">Ошибка загрузки продуктов</p>
          <p className="text-(--text-secondary) mt-2">{error}</p>
        </div>
      </div>
    );
  }

  let filteredProducts =
    filterQuery === "all"
      ? products
      : products.filter((p) => p.type === filterQuery);

  if (searchQuery.length >= 2) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand?.toLowerCase().includes(q) ?? false)
    );
  }

  const sortedProducts = SortLogic(filteredProducts, sortQuery);

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div 
      className="min-h-[calc(100vh-200px)] rounded-2xl md:rounded-3xl p-4 md:p-6 transition-all duration-500"
      style={{ background: getCatalogBg() }}
    >
      <div className="mb-4 md:mb-6 overflow-x-auto">
        <Suspense fallback={<div className="flex gap-2"><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /><div className="h-10 w-20 animate-pulse rounded-full bg-(--card-bg)" /></div>}>
          <Filter />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-(--text-muted)">
          <p className="text-xl font-bold">Товары не найдены</p>
          <p className="text-sm">Попробуйте изменить параметры поиска или фильтрации</p>
        </div>
      ) : (
        <Pagination totalItems={sortedProducts.length} itemsPerPage={itemsPerPage} />
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
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        >
          <source src="/CatalogBG.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 md:bg-black/60" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 lg:px-8">
          <div className="mb-6 md:mb-8 flex flex-col gap-4 md:gap-6 border-b border-(--border) pb-6 md:pb-8 md:flex-row md:items-end md:justify-between">
            <div className="rounded-2xl border border-(--border) bg-(--card-bg)/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight sm:text-5xl">
                НАШ <span className="text-(--text-muted)">КАТАЛОГ</span>
              </h1>
              <p className="mt-2 md:mt-4 text-base md:text-lg text-(--text-secondary)">
                Премиальные жидкости и девайсы для истинных ценителей.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-4 md:flex-row">
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
