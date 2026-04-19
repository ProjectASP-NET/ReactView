'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/UI/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/UI/StaggerContainer'
import FeaturedProducts from '@/components/Product/HitProducts'
import NewProducts from '@/components/Product/NewProducts'
import { PAGES } from '@/config/pages.config'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhySection />
      <FadeIn delay={0.1}>
        <FeaturedProducts />
      </FadeIn>
      <FadeIn delay={0.2}>
        <NewProducts />
      </FadeIn>
    </main>
  )
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[60vh] md:min-h-screen w-full items-center justify-center bg-[url('/banner.png')] bg-cover bg-no-repeat bg-center md:bg-fixed overflow-hidden">
      <div className="absolute inset-0 bg-black/40 md:bg-black/60 md:bg-linear-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card-bg) px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium tracking-widest text-(--text-primary) uppercase">
            Быстрая доставка по Кишиневу
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl text-4xl lg:text-7xl font-black tracking-tighter text-white md:text-8xl"
        >
          ИСКУССТВО <br />
          <motion.span
            initial={{ opacity: 0, backgroundPosition: '0% 50%' }}
            animate={{ opacity: 1, backgroundPosition: '100% 50%' }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 bg-[length:200%_auto]"
          >
            ГУСТОГО ПАРА
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base md:text-lg lg:text-xl font-light text-white/70"
        >
          D&D Liquid — это премиальные жидкости и топовые девайсы для тех, кто не согласен на компромиссы во вкусе.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <HeroButton href={PAGES.CATALOG} variant="primary">
            ОТКРЫТЬ КАТАЛОГ
          </HeroButton>
          <HeroButton href={PAGES.ABOUT} variant="secondary">
            О БРЕНДЕ
          </HeroButton>
        </motion.div>
      </div>
    </section>
  )
}

function HeroButton({ href, children, variant }: { href: string; children: React.ReactNode; variant: 'primary' | 'secondary' }) {
  const baseStyles = 'relative overflow-hidden rounded-full px-8 py-4 text-sm font-bold tracking-wider transition-all duration-300'
  
  if (variant === 'primary') {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={href} className={`${baseStyles} bg-white text-black block`}>
          <motion.span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent"
            animate={{ x: ['0%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
          />
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href} className={`${baseStyles} border border-(--border) bg-(--card-bg) text-(--text-primary) backdrop-blur-md`}>
        {children}
      </Link>
    </motion.div>
  )
}

function WhySection() {
  const features = [
    { title: "ОРИГИНАЛ", desc: "Только сертифицированная продукция от мировых брендов." },
    { title: "ВКУС", desc: "Сотни уникальных миксов от классики до экзотики." },
    { title: "КАЧЕСТВО", desc: "Структурированный контроль на каждом этапе производства." },
  ]

  return (
    <FadeIn>
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center bg-(--section-bg) px-4 md:px-6 py-16 md:py-24 text-(--text-primary)">
        <FadeIn>
          <h2 className="mb-8 md:mb-12 text-center text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">
            ПОЧЕМУ <span className="text-(--text-muted)">D&D LIQUID?</span>
          </h2>
        </FadeIn>
        
        <StaggerContainer className="grid max-w-6xl grid-cols-1 gap-6 md:gap-8 md:grid-cols-3" staggerDelay={0.15}>
          {features.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex h-full flex-col gap-4 rounded-3xl border border-(--card-border) bg-(--card-bg) p-8 transition-colors hover:border-(--text-secondary) hover:bg-(--card-hover)"
              >
                <h3 className="text-xl font-bold tracking-wider">{item.title}</h3>
                <p className="flex-1 font-light text-(--text-secondary) leading-relaxed">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeIn>
  )
}
