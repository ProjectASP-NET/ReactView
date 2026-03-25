import { MOCK_PRODUCTS } from "@/types/Products";
import { ProductCard } from "@/components/ProductCard"
export default function Catalog(){
    return(
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
        <div className="flex items-center gap-3 text-sm font-bold text-white/60 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <span>СОРТИРОВКА:</span>
          <select className="bg-transparent text-white focus:outline-none cursor-pointer outline-none">
            <option className="bg-[#0a0a0a] text-white">Сначала новые</option>
            <option className="bg-[#0a0a0a] text-white">Сначала дешевые</option>
            <option className="bg-[#0a0a0a] text-white">Сначала дорогие</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {MOCK_PRODUCTS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-white/40">
          <p className="text-xl font-bold">Товары не найдены</p>
          <p className="text-sm">Попробуйте изменить параметры фильтрации</p>
        </div>
      )}
    </main>
  );
}