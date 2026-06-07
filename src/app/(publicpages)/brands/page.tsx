"use client";

import { useEffect, useState } from "react";
import { BrandService } from "@/services/brand.service";
import { BrandDTO } from "@/types/product.types";
import { PAGES } from "@/config/pages.config";
import FadeIn from "@/components/UI/FadeIn";
import { Link } from 'next-view-transitions';

export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BrandService.getAllBrands().then((data) => {
      setBrands(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <FadeIn>
      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl mb-6">
            НАШИ <span className="text-(--text-muted)">БРЕНДЫ</span>
          </h1>
          <p className="text-xl text-(--text-secondary) max-w-2xl mx-auto">
            Мы работаем только с лучшими производителями, чтобы гарантировать качество каждого товара.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-3xl bg-(--card-bg)" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link href={PAGES.getBrand(brand.id)} key={brand.id}>
                <div className="group relative overflow-hidden rounded-3xl border border-(--card-border) bg-(--card-bg) p-8 transition-all duration-500 hover:border-(--primary) hover:shadow-2xl hover:shadow-(--primary)/20">
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <h3 className="text-2xl font-bold mb-4">{brand.name}</h3>
                  <p className="text-(--text-secondary) line-clamp-3 mb-6">
                    {brand.description || "Производитель премиальной продукции."}
                  </p>
                  <div className="text-(--primary) font-semibold flex items-center gap-2">
                    Перейти к продуктам
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </FadeIn>
  );
}
