import Link from "next/link";
import Image from "next/image";
import { PAGES } from "@/config/pages.config";
import { AddtoCart } from "./AddtoCartB";
import { QuickViewButton } from "./QuickViewButton";
import { Product } from "@/types/Mockdata";
interface CardProps{
    product : Product;
}
export function ProductCard({product} : CardProps) {
    const productURL = `${PAGES.CATALOG}/${product.id}`
    return ( 
    <div className="group relative flex flex-col rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--text-secondary)] hover:bg-[var(--card-hover)]">
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">
            {product.brand}
          </p>
          <Link href={productURL}>
            <h3 className="text-lg font-bold hover:text-[var(--text-secondary)] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-xl font-black text-[var(--text-primary)]">
            {product.price} <span className="text-sm font-light text-[var(--text-muted)]">MDL</span>
          </p>
        </div>
        <AddtoCart
        productID={product.id}
        inStock = {product.InStock}
        />
        <QuickViewButton product={product} />
    </div>        
    </div>
     );
    }
