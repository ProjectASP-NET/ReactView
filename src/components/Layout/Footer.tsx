import Image from "next/image";
import Link from "next/link";
import { MENU } from "../../types/menu.data";

export function Footer() {
  return (
    <footer className="w-full border-t border-(--border) bg-(--section-bg) pt-16 pb-8 mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 border-b border-(--border) pb-12 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--card-bg) p-2 ring-1 ring-(--border)">
              <Image
                src="/logo1.png"
                alt="D&D Liquid"
                width={40}
                height={40}
                className="h-auto w-full object-contain brightness-110 grayscale"
              />
            </div>
            <span className="text-xl font-light tracking-[0.2em] text-(--text-primary) uppercase">
              D&D <span className="font-bold">Liquid</span>
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {MENU.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wide text-(--text-secondary) transition-colors hover:text-(--text-primary)"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">   
          <div className="flex flex-col gap-2">
            <p className="text-xs text-(--text-muted)">
              © {new Date().getFullYear()} D&D Liquid. Все права защищены.
            </p>
            <p className="text-[10px] font-bold tracking-widest text-red-500/80 uppercase">
              Продажа несовершеннолетним запрещена (18+)
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
