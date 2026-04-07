import Link from 'next/link'
import { PAGES } from '@/config/pages.config';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--section-bg) px-6">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-[8rem] font-black tracking-tighter text-(--text-primary) leading-none">
          404
        </h1>
        <p className="text-xl font-light text-(--text-secondary)">
          Page not found
        </p>
        <Link
          href={PAGES.HOME}
          className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold tracking-wider text-black transition-transform hover:scale-105 active:scale-95"
        >
          GO TO HOME
        </Link>
      </div>
    </main>
  )
}
