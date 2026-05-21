"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { useProducts } from "@/context/ProductContext";
import { PAGES } from "@/config/pages.config";

export default function FeaturedProducts() {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  const { products, isLoading } = useProducts();

  const featuredItems = [...products]
    .sort((a, b) => b.LikeCount - a.LikeCount)
    .slice(0, 7);

  if (isLoading) {
    return (
      <section className="w-full bg-(--section-bg) py-24 text-(--text-primary)">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-(--section-bg) py-24 text-(--text-primary)">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              ТОВАРЫ <span className="text-(--text-muted)">ДНЯ</span>
            </h2>
            <p className="mt-4 text-(--text-secondary)">Выбор наших клиентов на этой неделе</p>
          </div>
          <Link href={PAGES.getCatalog("mliked")} className="hidden text-sm font-bold tracking-widest hover:text-(--text-secondary) sm:block transition-colors">
            СМОТРЕТЬ ВСЕ →
          </Link>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {featuredItems.map((product) => (
              <div key={product.id} className="flex-[0_0_auto] w-70 sm:w-[320px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
