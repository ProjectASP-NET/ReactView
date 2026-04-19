'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PressEffectProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function PressEffect({ children, className = '', onClick }: PressEffectProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PulseButtonProps {
  children: ReactNode
  onClick?: () => void
  active?: boolean
  className?: string
}

export function PulseButton({ children, onClick, active, className = '' }: PulseButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={active ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}
