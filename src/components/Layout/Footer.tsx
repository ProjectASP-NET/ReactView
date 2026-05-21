import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const NAVIGATION = [
  { name: "Каталог", href: "/catalog" },
  { name: "О нас", href: "/about" },
  { name: "Избранное", href: "/favorites" },
  { name: "Корзина", href: "/cart" },
];

const BUYER = [
  { name: "Доставка", href: "#" },
  { name: "Оплата", href: "#" },
  { name: "Возврат", href: "#" },
  { name: "Гарантия", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-(--border) bg-(--section-bg) pt-12 md:pt-16 pb-6 md:pb-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:gap-12 border-b border-(--border) pb-8 md:pb-12 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-(--text-primary) uppercase mb-3 md:mb-4">
              Навигация
            </h3>
            <nav className="flex flex-col gap-2 md:gap-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest text-(--text-primary) uppercase mb-3 md:mb-4">
              Покупателю
            </h3>
            <nav className="flex flex-col gap-2 md:gap-3">
              {BUYER.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest text-(--text-primary) uppercase mb-3 md:mb-4">
              Контакты
            </h3>
            <div className="flex flex-col gap-2 md:gap-3">
              <a
                href="tel:+37360757878"
                className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                +373 60 757878
              </a>
              <a
                href="mailto:dmitrii.olaresco@isa.utm.md"
                className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                dmitrii.olaresco@isa.utm.md
              </a>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col items-center justify-between gap-3 md:gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-(--text-muted)">
            © {new Date().getFullYear()} D&D Liquid. Все права защищены.
          </p>
          <p className="text-[10px] md:text-[10px] font-bold tracking-widest text-red-500/80 uppercase">
            Продажа несовершеннолетним запрещена (18+)
          </p>
        </div>
      </div>
    </footer>
  );
}