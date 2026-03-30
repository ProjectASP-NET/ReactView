'use client'
import Link from "next/link";
import Image from "next/image";
import { Scale } from "lucide-react";
import { PAGES } from "@/config/pages.config";
import { AddtoCart } from "./AddtoCartB";
import { QuickViewButton } from "./QuickViewButton";
import { Product } from "@/types/Mockdata";
import { useCompare } from "@/context/CompareContext";
interface CardProps{
    product : Product;
}
export function ProductCard({product} : CardProps) {
    const productURL = `${PAGES.CATALOG}/${product.id}`;
    const { toggleCompare, isInCompare } = useCompare();
    const isAdded = isInCompare(product.id);
    return ( 
    <div className="group relative flex flex-col rounded-3xl border border-(--card-border) bg-(--card-bg) p-4 transition-all hover:border-(--text-secondary) hover:bg-(--card-hover)">
      <Link href={productURL} className="block relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-black/50 p-6">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={Number(product.id) < 4}
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-md uppercase">
          {product.type === "liquid" ? "Жидкость" : product.type === "vape" ? "Девайс" : "Расходник"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-muted) mb-1">
            {product.brand}
          </p>
          <Link href={productURL}>
            <h3 className="text-lg font-bold hover:text-(--text-secondary) transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-xl font-black text-(--text-primary)">
            {product.price} <span className="text-sm font-light text-(--text-muted)">MDL</span>
          </p>
        </div>
        <AddtoCart
        productID={product.id}
        inStock = {product.InStock}
        />
        <QuickViewButton product={product} />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCompare(product);
          }}
          className={`mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors ${
            isAdded
              ? "border-(--text-secondary) bg-(--text-secondary) text-(--background)"
              : "border-(--border) bg-(--card-bg) text-(--text-secondary) hover:border-(--text-secondary)"
          }`}
        >
          <Scale size={16} />
          {isAdded ? "В сравнении" : "Сравнить"}
        </button>
    </div>        
    </div>
     );
    }
