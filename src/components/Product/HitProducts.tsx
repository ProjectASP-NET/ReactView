"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
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
              <div key={product.id} className="group relative flex-[0_0_auto] w-70 sm:w-[320px]">
                <div className="flex h-full flex-col rounded-3xl border border-(--card-border) bg-(--card-bg) p-4 transition-all duration-300 hover:border-(--text-secondary) hover:bg-(--card-hover)">
                  <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-(--card-bg) p-6">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold tracking-widest backdrop-blur-md uppercase text-white">
                      {product.type === 'liquid' ? 'Жидкость' : product.type === 'vape' ? 'Pod-система' : 'Девайс'}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest mb-1">
                        {product.brand}
                      </p>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="mt-2 text-2xl font-black text-(--text-primary)">
                        {product.price} <span className="text-sm font-light text-(--text-muted)">MDL</span>
                      </p>
                    </div>
                    <button 
                      disabled={!product.InStock}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-(--text-primary) py-3 text-sm font-bold text-(--background) transition-transform hover:scale-[1.02] active:scale-95 disabled:bg-(--text-muted) disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={18} />
                      {product.InStock ? 'В КОРЗИНУ' : 'НЕТ В НАЛИЧИИ'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
