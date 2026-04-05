'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link'
import FadeIn from '@/components/UI/FadeIn'
import FeaturedProducts from '@/components/Product/HitProducts';
import NewProducts from '@/components/Product/NewProducts';
import { PAGES } from '@/config/pages.config';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <FadeIn>
    <main className="flex min-h-screen flex-col">
      <section className="relative flex h-screen w-full items-center justify-center bg-[url('/banner.png')] bg-cover bg-fixed bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card-bg) px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-(--text-primary) uppercase">
              {t('fastDelivery')}
            </span>
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl">
            {t('title')} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">
              {t('subtitle')}
            </span>
          </h1>
          <p className="max-w-2xl text-lg font-light text-white/70 sm:text-xl">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={PAGES.CATALOG}
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold tracking-wider text-black transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{t('openCatalog')}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
            <Link
              href={PAGES.ABOUT}
              className="rounded-full border border-(--border) bg-(--card-bg) px-8 py-4 text-sm font-bold tracking-wider text-(--text-primary) backdrop-blur-md transition-all hover:bg-(--card-hover) hover:shadow-[0_0_20px_rgba(255,255,255,0.1) active:scale-95"
            >
              {t('aboutBrand')}
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center bg-(--section-bg) px-6 py-24 text-(--text-primary)">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight md:text-6xl">
          {t('whyDND')}
        </h2>
        <div className="grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { title: t('original'), desc: t('originalDesc') },
            { title: t('taste'), desc: t('tasteDesc') },
            { title: t('quality'), desc: t('qualityDesc') },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-3xl border border-(--card-border) bg-(--card-bg) p-8 transition-colors hover:bg-(--card-hover)">
              <h3 className="text-xl font-bold tracking-wider">{item.title}</h3>
              <p className="font-light text-(--text-secondary) leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    <FeaturedProducts />
    <NewProducts />
    </main>
    </FadeIn>
  );
}
