"use client";

import { useParams, notFound } from "next/navigation";
import { Link } from 'next-view-transitions';
import { useProducts } from "@/context/ProductContext";
import { AddtoCart } from "@/components/Buttons/AddtoCartB";
import { ProductRadarModal } from "@/components/Modal/ProductRadarModal";
import { ProductPageActions } from "@/components/Product/ProductPageActions";
import { ProductCard } from "@/components/Product/ProductCard";
import { ImageGallery } from "@/components/Product/ImageGallery";
import { PAGES } from "@/config/pages.config";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { getProductById, products, isLoading } = useProducts();
  const product = !isLoading ? getProductById(id) : null;

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-(--text-secondary)">Загрузка...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (p) => p.id !== id && p.type === product.type
  ).slice(0, 4);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "liquid":
        return "Жидкость";
      case "vape":
        return "Девайс";
      case "consumables":
        return "Расходник";
      default:
        return type;
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-(--text-muted)">
        <Link href={PAGES.CATALOG} className="hover:text-(--text-primary) transition-colors">
          Каталог
        </Link>
        <span>/</span>
        <span className="text-(--text-secondary)">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ImageGallery product={product} typeLabel={getTypeLabel(product.type)} />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-widest text-(--text-muted) mb-2">
              {product.brand}
            </p>
            <h1 className="text-4xl font-black text-(--text-primary) mb-4">{product.name}</h1>
            {product.category && (
              <p className="text-sm text-(--accent) mb-2">
                {product.category}
              </p>
            )}

            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-5xl font-black text-(--text-primary)">
                {product.price}
              </span>
              <span className="text-xl font-light text-(--text-muted)">MDL</span>
            </div>

            <div className="mb-8 rounded-2xl border border-(--border) bg-(--card-bg) p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-(--text-muted)">Тип</p>
                  <p className="font-bold text-(--text-primary)">{getTypeLabel(product.type)}</p>
                </div>
                {product.tags.length > 0 && (
                  <div>
                    <p className="text-(--text-muted)">Теги</p>
                    <p className="font-bold text-(--text-primary)">
                      {product.tags.join(", ")}
                    </p>
                  </div>
                )}
                {"volume" in product && (
                  <div>
                    <p className="text-(--text-muted)">Объём</p>
                    <p className="font-bold text-(--text-primary)">{product.volume} мл</p>
                  </div>
                )}
                {"nicotine" in product && (
                  <div>
                    <p className="text-(--text-muted)">Никотин</p>
                    <p className="font-bold text-(--text-primary)">{product.nicotine} мг</p>
                  </div>
                )}
                {"flavor" in product && (
                  <div>
                    <p className="text-(--text-muted)">Вкусы</p>
                    <p className="font-bold text-(--text-primary)">
                      {product.flavor.join(", ")}
                    </p>
                  </div>
                )}
                {"batteryCapacity" in product && (
                  <div>
                    <p className="text-(--text-muted)">Ёмкость батареи</p>
                    <p className="font-bold text-(--text-primary)">
                      {product.batteryCapacity} mAh
                    </p>
                  </div>
                )}
                {"maxPower" in product && (
                  <div>
                    <p className="text-(--text-muted)">Макс. мощность</p>
                    <p className="font-bold text-(--text-primary)">{product.maxPower} Вт</p>
                  </div>
                )}
                {"color" in product && (
                  <div>
                    <p className="text-(--text-muted)">Цвет</p>
                    <p className="font-bold text-(--text-primary)">{product.color}</p>
                  </div>
                )}
                <div>
                  <p className="text-(--text-muted)">Наличие</p>
                  <p className={`font-bold ${product.InStock ? "text-green-500" : "text-red-500"}`}>
                    {product.InStock ? "В наличии" : "Нет в наличии"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {product.type !== "consumables" && (
            <ProductRadarModal product={product} />
          )}

          <ProductPageActions product={product} />

          <AddtoCart productID={product.id} inStock={product.InStock} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-2xl font-bold text-(--text-secondary)">
            Похожие товары
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
