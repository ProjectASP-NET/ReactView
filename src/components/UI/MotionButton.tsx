'use client'

import { motion } from 'framer-motion'
import { ReactNode, ButtonHTMLAttributes } from 'react'

interface MotionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function MotionButton({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md',
  ...props 
}: MotionButtonProps) {
  const baseStyles = 'relative overflow-hidden rounded-xl font-bold tracking-wider transition-colors'
  
  const variants = {
    primary: 'bg-(--text-primary) text-(--background) hover:brightness-110',
    secondary: 'border border-(--border) bg-(--card-bg) text-(--text-primary) hover:bg-(--card-hover)',
    ghost: 'text-(--text-primary) hover:bg-(--card-bg)'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100"
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface MotionLinkProps {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function MotionLink({ 
  href, 
  children, 
  className = '',
  variant = 'primary',
  size = 'md'
}: MotionLinkProps) {
  const { motion: MotionLink } = require('framer-motion')
  const Link = require('next/link').default
  
  const baseStyles = 'relative overflow-hidden rounded-xl font-bold tracking-wider transition-colors inline-block'
  
  const variants = {
    primary: 'bg-(--text-primary) text-(--background)',
    secondary: 'border border-(--border) bg-(--card-bg) text-(--text-primary) hover:bg-(--card-hover)',
    ghost: 'text-(--text-primary) hover:bg-(--card-bg)'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      <motion.span
        className="relative z-10 inline-block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.span>
    </Link>
  )
}
