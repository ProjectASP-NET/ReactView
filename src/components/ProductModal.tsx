"use client";

import Image from "next/image";
import { Product } from "@/types/Mockdata";
import { useEffect } from "react";
import { AddtoCart } from "./AddtoCartB"; 

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-8"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="relative shrink-0 w-full md:w-1/2 aspect-square bg-black/50 rounded-2xl flex items-center justify-center p-6 border border-white/5">
           <Image 
            src={product.img} 
            alt={product.name}
            fill
            className="object-contain p-4"
          />
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-md uppercase">
            {product.type === "liquid" ? "Жидкость" : "Девайс"}
          </span>
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
              {product.brand}
            </p>
            <h2 className="text-3xl font-black text-white mb-4">{product.name}</h2>
            <p className="text-white/60 mb-8 line-clamp-4">
              Подробное описание товара. Премиальное качество, насыщенный вкус и отличная вкусопередача.
            </p>
          </div>
          
          <div className="mt-auto">
            <p className="text-4xl font-black text-white mb-6">
              {product.price} <span className="text-lg font-light text-white/50">MDL</span>
            </p>
            <AddtoCart productID={product.id} inStock={product.InStock} />
          </div>
        </div>
      </div>
    </div>
  );
}