"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product.types";

interface ImageGalleryProps {
  product: Product;
  typeLabel: string;
}

export function ImageGallery({ product, typeLabel }: ImageGalleryProps) {
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-black/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={images[selectedIndex]}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-4 py-2 text-xs font-bold tracking-widest text-white backdrop-blur-md uppercase">
          {typeLabel}
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === selectedIndex
                  ? "border-(--text-primary) opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <Image
                src={url}
                alt={`${product.name} ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
