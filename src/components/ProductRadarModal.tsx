"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/types/Mockdata";
import { ProductRadar } from "./ProductRadar";

interface Props {
  product: Product;
}

export function ProductRadarModal({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 border border-white/10"
      >
        <BarChart3 size={18} className="text-green-500" />
        Диаграмма Качеств
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 sm:max-w-lg md:max-w-xl"
            >
              <div className="rounded-3xl border border-white/10 bg-black/90 p-6 sm:p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Характеристики товара
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <ProductRadar product={product} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
