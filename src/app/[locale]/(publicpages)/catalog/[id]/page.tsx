import { getTranslations } from 'next-intl/server';
import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/types/Products";
import { AddtoCart } from "@/components/Buttons/AddtoCartB";
import { ProductRadarModal } from "@/components/Modal/ProductRadarModal";
import { ProductPageActions } from "@/components/Product/ProductPageActions";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/Product/ProductCard";
import { PAGES } from "@/config/pages.config";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const t = await getTranslations('Product');
  const tCatalog = await getTranslations('Catalog');
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== id && p.type === product.type
  ).slice(0, 4);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "liquid":
        return t('liquid');
      case "vape":
        return t('vape');
      case "consumables":
        return t('consumables');
      default:
        return type;
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-(--text-muted)">
        <Link href={PAGES.CATALOG} className="hover:text-(--text-primary) transition-colors">
          {tCatalog('catalog')}
        </Link>
        <span>/</span>
        <span className="text-(--text-secondary)">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-black/50">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-contain p-8"
            priority
          />
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-2 text-xs font-bold tracking-widest text-white backdrop-blur-md uppercase">
            {getTypeLabel(product.type)}
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-widest text-(--text-muted) mb-2">
              {product.brand}
            </p>
            <h1 className="text-4xl font-black text-(--text-primary) mb-4">{product.name}</h1>

            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-5xl font-black text-(--text-primary)">
                {product.price}
              </span>
              <span className="text-xl font-light text-(--text-muted)">MDL</span>
            </div>

              <div className="mb-8 rounded-2xl border border-(--border) bg-(--card-bg) p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-(--text-muted)">{t('type')}</p>
                  <p className="font-bold text-(--text-primary)">{getTypeLabel(product.type)}</p>
                </div>
                {"volume" in product && (
                  <div>
                    <p className="text-(--text-muted)">{t('volume')}</p>
                    <p className="font-bold text-(--text-primary)">{product.volume} {t('volume').toLowerCase()}</p>
                  </div>
                )}
                {"nicotine" in product && (
                  <div>
                    <p className="text-(--text-muted)">{t('nicotine')}</p>
                    <p className="font-bold text-(--text-primary)">{product.nicotine} {t('nicotine').toLowerCase()}</p>
                  </div>
                )}
                {"flavor" in product && (
                  <div>
                    <p className="text-(--text-muted)">{t('flavor')}</p>
                    <p className="font-bold text-(--text-primary)">
                      {product.flavor.join(", ")}
                    </p>
                  </div>
                )}
                {"batteryCapacity" in product && (
                  <div>
                    <p className="text-(--text-muted)">{t('batteryCapacity')}</p>
                    <p className="font-bold text-(--text-primary)">
                      {product.batteryCapacity} mAh
                    </p>
                  </div>
                )}
                {"maxPower" in product && (
                  <div>
                    <p className="text-(--text-muted)">{t('maxPower')}</p>
                    <p className="font-bold text-(--text-primary)">{product.maxPower} {t('maxPower').toLowerCase()}</p>
                  </div>
                )}
                {"color" in product && (
                  <div>
                    <p className="text-(--text-muted)">{t('color')}</p>
                    <p className="font-bold text-(--text-primary)">{product.color}</p>
                  </div>
                )}
                <div>
                  <p className="text-(--text-muted)">{t('inStock')}</p>
                  <p className={`font-bold ${product.InStock ? "text-green-500" : "text-red-500"}`}>
                    {product.InStock ? t('inStock') : t('outOfStock')}
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
            {t('similarProducts')}
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
