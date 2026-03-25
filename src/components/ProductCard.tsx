import Link from "next/link";
import Image from "next/image";
import { PAGES } from "@/config/pages.config";
import { AddtoCart } from "./AddtoCartB";
import { Product } from "@/types/Mockdata";
interface CardProps{
    product : Product;
}
export function ProductCard({product} : CardProps) {
    const productURL = `${PAGES.CATALOG}/${product.id}`
    return ( 
    <div className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/30 hover:bg-white/10">
      <Link href={productURL} className="block relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-black/50 p-6">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-md uppercase">
          {product.type === "liquid" ? "Жидкость" : "Девайс"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
            {product.brand}
          </p>
          <Link href={productURL}>
            <h3 className="text-lg font-bold hover:text-white/80 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-xl font-black text-white/90">
            {product.price} <span className="text-sm font-light text-white/50">MDL</span>
          </p>
        </div>
        <AddtoCart
        productID={product.id}
        inStock = {product.InStock}
        />
    </div>        
    </div>
     );
    }
