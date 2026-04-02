"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { MOCK_PRODUCTS } from "../../types/Products";
import { PAGES } from "@/config/pages.config";
export default function NewProducts() {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  const NewItems = [...MOCK_PRODUCTS]
  .sort((a,b) =>Number(b.id) - Number(a.id)) 
  .slice(0, 7);
  return (
    <section className="w-full bg-(--section-bg) py-24 text-(--text-primary)">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
               <span className="text-(--text-muted)">Новинки</span>
            </h2>
            <p className="mt-4 text-(--text-secondary)">Новые поступления в нашем каталоге</p>
          </div>
          <Link href={PAGES.getCatalog("new")} className="hidden text-sm font-bold tracking-widest hover:text-(--text-secondary) sm:block transition-colors">
            СМОТРЕТЬ ВСЕ →
          </Link>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {NewItems.map((product) => (
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
