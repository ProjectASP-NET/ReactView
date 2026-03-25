'use client'
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Product } from "@/types/Mockdata"
interface ProductProps{
  productID : Product['id'];
  inStock : Product['InStock'];
}
 export function AddtoCart({ productID , inStock } : ProductProps){
    const [isAdded,SetisAdded] = useState(false);
    const handleAdd = () => {
        console.log(`Товар добавлен в корзину ${productID}`);
        SetisAdded(true);
        setTimeout(() => SetisAdded(false), 2000);
    };
    if(!inStock){
        return (
            <button disabled className="mt-4 w-full rounded-xl bg-white/10 py-3 text-sm font-bold text-white/40 cursor-not-allowed">
                НЕТ В НАЛИЧИИ
            </button>
        );
    }

return (
        <button
            onClick={handleAdd}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all active:scale-95 ${
                isAdded 
                    ? "bg-green-500 text-white" 
                    : "bg-white text-black hover:scale-[1.02]"
            }`}
        >
            <ShoppingCart size={18} />
            {isAdded ? "ДОБАВЛЕНО" : "В КОРЗИНУ"}
        </button>
    );
}