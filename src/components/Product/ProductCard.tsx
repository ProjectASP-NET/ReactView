'use client'
import Link from "next/link";
import Image from "next/image";
import { Scale, Heart, Star } from "lucide-react";
import { PAGES } from "@/config/pages.config";
import { AddtoCart } from "../Buttons/AddtoCartB";
import { QuickViewButton } from "../Buttons/QuickViewButton";
import { Product } from "@/types/Mockdata";
import { useCompare } from "@/context/CompareContext";
import { useLikeandFav } from "@/context/LikeandFavContext";
interface CardProps{
    product : Product;
}
export function ProductCard({product} : CardProps) {
    const productURL = PAGES.getProduct(product.id);
    const { toggleCompare, isInCompare } = useCompare();
    const { toggleLike, toggleFavorite, isLiked, isFavorite } = useLikeandFav();
    const isAdded = isInCompare(product.id);
    const liked = isLiked(product.id);
    const favorited = isFavorite(product.id);
    return ( 
    <div className="group relative flex flex-col rounded-3xl border border-(--card-border) bg-(--card-bg) p-4 transition-all hover:border-(--text-secondary) hover:bg-(--card-hover)">
      <Link href={productURL} className="block relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-black/50 p-6 group">
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
        <div className="absolute right-3 bottom-3 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleLike(product.id);
            }}
            className={`flex h-10 items-center gap-1.5 rounded-full px-3 shadow-lg transition-all ${
              liked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/95 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            <span className="text-sm font-bold">{product.LikeCount + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product);
            }}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all ${
              favorited
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-white/95 text-gray-600 hover:bg-yellow-400 hover:text-black"
            }`}
          >
            <Star size={18} fill={favorited ? "currentColor" : "none"} />
          </button>
        </div>
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
