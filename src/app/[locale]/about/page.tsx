import { Droplets, Award, Truck, Shield, Clock, Heart } from "lucide-react";

const STATS = [
  { value: "5+", label: "Лет на рынке" },
  { value: "10000+", label: "Довольных клиентов" },
  { value: "500+", label: "Товаров в наличии" },
  { value: "98%", label: "Положительных отзывов" },
];

const FEATURES = [
  {
    icon: Droplets,
    title: "Оригинальная продукция",
    description: "Работаем напрямую с производителями и официальными дистрибьюторами. Никаких подделок.",
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    description: "Отправляем в день заказа. Доставка по Кишиневу за 1-2 часа, по Молдове за 1-3 дня.",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Возврат товара в течение 14 дней, если товар не подошёл или оказался бракованным.",
  },
  {
    icon: Award,
    title: "Лучшие бренды",
    description: "Vaporesso, Smok, GeekVape, Voopoo, Aspire и другие ведущие мировые бренды.",
  },
  {
    icon: Clock,
    title: "Поддержка 24/7",
    description: "Отвечаем на вопросы в Telegram, Instagram и по телефону каждый день.",
  },
  {
    icon: Heart,
    title: "Скидки и бонусы",
    description: "Программа лояльности, регулярные акции и специальные предложения для постоянных клиентов.",
  },
];

const TIMELINE = [
  {
    year: "2019",
    title: "Основание",
    description: "Открыли первую точку продаж в центре Кишинева с ассортиментом из 50 товаров.",
  },
  {
    year: "2020",
    title: "Онлайн-магазин",
    description: "Запустили интернет-магазин и начали доставку по всей Молдове.",
  },
  {
    year: "2021",
    title: "Расширение ассортимента",
    description: "Увеличили каталог до 300+ товаров, открыли склад и пункт самовывоза.",
  },
  {
    year: "2022",
    title: "Партнёрство",
    description: "Статус официального дистрибьютора Vaporesso и GeekVape в Молдове.",
  },
  {
    year: "2023",
    title: "Реконструкция",
    description: "Обновили брендинг, запустили программу лояльности и мобильное приложение.",
  },
  {
    year: "2024",
    title: "Лидерство",
    description: "Стабильно входим в топ-3 вейп-магазинов Молдовы по отзывам покупателей.",
  },
];

export default function AboutUs() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="text-center mb-20">
        <span className="inline-block rounded-full bg-(--text-secondary)/10 px-4 py-2 text-sm font-medium text-(--text-secondary) mb-6">
          О компании
        </span>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl mb-6">
          D&D <span className="text-(--text-secondary)">Liquid</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-(--text-secondary)">
          Ваш надёжный партнёр в мире вейпинга с 2019 года. Мы предлагаем только 
          качественную продукцию от проверенных брендов по доступным ценам.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-20">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-(--border) bg-(--card-bg) p-6 text-center"
          >
            <div className="text-3xl font-black text-(--text-secondary) mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-(--text-muted)">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="mb-20">
        <div className="relative rounded-3xl border border-(--border) bg-(--card-bg) overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-(--text-secondary)/5 to-transparent" />
          <div className="relative p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-6">Наша миссия</h2>
            <p className="text-lg text-(--text-secondary) mb-6">
              Мы верим, что вейпинг — это не просто альтернатива курению, а целая культура. 
              Наша цель — сделать качественные продукты доступными каждому, кто хочет 
              перейти на более безопасный способ потребления никотина или просто насладиться 
              новыми вкусами.
            </p>
            <p className="text-lg text-(--text-secondary)">
              Мы не просто продаём жидкости и девайсы — мы строим сообщество единомышленников, 
              которые ценят качество, стиль и ответственный подход к своему здоровью.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-(--border) bg-(--card-bg) p-6 transition-all hover:border-(--text-secondary)"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-(--text-secondary)/10">
                <feature.icon
                  size={24}
                  className="text-(--text-secondary)"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-(--text-muted)">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Наш путь</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-(--border) lg:left-1/2 lg:-translate-x-px" />
          <div className="space-y-8">
            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-6 lg:gap-0 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"}`}>
                  <div className="rounded-2xl border border-(--border) bg-(--card-bg) p-6">
                    <span className="inline-block rounded-full bg-(--text-secondary) px-3 py-1 text-xs font-bold text-(--background) mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-(--text-muted)">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-(--text-secondary) ring-4 ring-(--card-bg) lg:left-1/2 lg:-translate-x-1/2" />
                <div className="lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
        <p className="text-(--text-secondary) mb-8 max-w-xl mx-auto">
          Есть вопросы? Мы всегда рады помочь! Напишите нам в социальных сетях 
          или позвоните — ответим в течение часа.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+37300000000"
            className="rounded-xl bg-(--text-primary) px-6 py-3 font-bold text-(--background) transition-colors hover:bg-(--text-secondary)"
          >
            Позвонить
          </a>
          <a
            href="https://t.me/ddliqiud"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-(--border) px-6 py-3 font-bold transition-colors hover:border-(--text-secondary)"
          >
            Telegram
          </a>
        </div>
      </section>
    </main>
  );
}
