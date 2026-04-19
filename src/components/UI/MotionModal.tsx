'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface MotionModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function MotionModal({ isOpen, onClose, children, title }: MotionModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-full max-w-lg rounded-3xl border border-(--border) bg-(--section-bg) p-6 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {title && (
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-(--text-primary)">{title}</h2>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 transition-colors hover:bg-(--card-bg)"
                  >
                    <X className="h-5 w-5 text-(--text-muted)" />
                  </button>
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
