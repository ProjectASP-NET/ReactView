"use client"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductContext"
import { useToast } from "@/components/UI/Toast"
import { motion, AnimatePresence } from "framer-motion"

interface AddtoCartProps {
  productID: string
  inStock: boolean
}

export function AddtoCart({ productID, inStock }: AddtoCartProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useCart()
  const { getProductById } = useProducts()
  const { showToast } = useToast()

  const handleAdd = () => {
    const product = getProductById(productID)
    if (product) {
      addToCart(product)
      setIsAdded(true)
      showToast(`${product.name} добавлен в корзину`, 'success')
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  if (!inStock) {
    return (
      <button
        disabled
        className="mt-4 w-full rounded-xl bg-(--card-bg) py-3 text-sm font-bold text-(--text-muted) cursor-not-allowed border border-(--border)"
      >
        НЕТ В НАЛИЧИИ
      </button>
    )
  }

  return (
    <motion.button
      onClick={handleAdd}
      whileTap={{ scale: 0.95 }}
      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
        isAdded 
          ? "bg-green-500 text-white" 
          : "bg-(--text-primary) text-(--background) hover:brightness-110"
      }`}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </motion.svg>
            ДОБАВЛЕНО
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            В КОРЗИНУ
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
