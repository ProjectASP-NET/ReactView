"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { MOCK_PRODUCTS } from "../../types/Products";

export default function FeaturedProducts() {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  const featuredItems = MOCK_PRODUCTS.slice(1, 7);

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
          <Link href="/catalog" className="hidden text-sm font-bold tracking-widest hover:text-(--text-secondary) sm:block transition-colors">
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
