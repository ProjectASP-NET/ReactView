import { MOCK_PRODUCTS } from "@/types/Products";
import { ProductCard } from "@/components/ProductCard"
import { Sort } from "@/components/Sort";
import { SortLogic } from "@/types/SortLogic";
import FadeIn from "@/components/FadeIn";
interface CatalogProps {
  searchParams: {
    sort?: string;
  };
}
export default function Catalog({searchParams}: CatalogProps) {
        const sortQuery = searchParams.sort || "new";
      const sortedProducts = SortLogic(MOCK_PRODUCTS, sortQuery);
    return(
       <FadeIn>
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            НАШ <span className="text-white/50">КАТАЛОГ</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Премиальные жидкости и девайсы для истинных ценителей.
          </p>
        </div>
        <Sort />
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
    </main>
    </FadeIn>
  );
}