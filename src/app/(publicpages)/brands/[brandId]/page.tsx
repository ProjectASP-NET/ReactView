"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BrandService } from "@/services/brand.service";
import { BrandDTO } from "@/types/product.types";
import { ProductAdapter } from "@/adapters/product.adapter";
import { ProductCard } from "@/components/Product/ProductCard";
import FadeIn from "@/components/UI/FadeIn";

export default function BrandDetailPage() {
  const { brandId } = useParams();
  const [brand, setBrand] = useState<BrandDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (brandId) {
      BrandService.getBrandById(parseInt(brandId as string)).then((data) => {
        setBrand(data);
        setIsLoading(false);
      });
    }
  }, [brandId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        </div>
      </div>
    );
  }

  if (!brand) return <div className="text-center py-20">Бренд не найден</div>;

  const brandProducts = ProductAdapter.toMockFormatArray(brand.products ?? []);

  return (
    <FadeIn>
      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div className="mb-16 border-b border-(--border) pb-12">
          <h1 className="text-5xl font-black tracking-tight mb-6">
            {brand.name}
          </h1>
          <p className="text-xl text-(--text-secondary) max-w-3xl">
            {brand.description || "Откройте для себя наш ассортимент продукции этого бренда."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {brandProducts.length === 0 && (
          <div className="text-center py-20 text-(--text-muted)">
            Товары этого бренда пока не добавлены.
          </div>
        )}
      </main>
    </FadeIn>
  );
}
