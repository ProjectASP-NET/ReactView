import { getTranslations } from 'next-intl/server';
import { Droplets, Award, Truck, Shield, Clock, Heart } from "lucide-react";

export default async function AboutUs() {
  const t = await getTranslations('About');

  const STATS = [
    { value: "5+", label: t('years') },
    { value: "10000+", label: t('clients') },
    { value: "500+", label: t('products') },
    { value: "98%", label: t('reviews') },
  ];

  const FEATURES = [
    {
      icon: Droplets,
      title: t('originalProducts'),
      description: t('originalDesc'),
    },
    {
      icon: Truck,
      title: t('fastDeliveryTitle'),
      description: t('fastDeliveryDesc'),
    },
    {
      icon: Shield,
      title: t('qualityGuarantee'),
      description: t('qualityDesc'),
    },
    {
      icon: Award,
      title: t('bestBrands'),
      description: "Vaporesso, Smok, GeekVape, Voopoo, Aspire и другие ведущие мировые бренды.",
    },
    {
      icon: Clock,
      title: t('support'),
      description: t('supportDesc'),
    },
    {
      icon: Heart,
      title: t('discounts'),
      description: t('discountsDesc'),
    },
  ];

  const TIMELINE = [
    {
      year: "2019",
      title: t('founded'),
      description: t('foundedDesc'),
    },
    {
      year: "2020",
      title: t('onlineStore'),
      description: t('onlineStoreDesc'),
    },
    {
      year: "2021",
      title: t('expansion'),
      description: t('expansionDesc'),
    },
    {
      year: "2022",
      title: t('partnership'),
      description: t('partnershipDesc'),
    },
    {
      year: "2023",
      title: t('reconstruction'),
      description: t('reconstructionDesc'),
    },
    {
      year: "2024",
      title: t('leadership'),
      description: t('leadershipDesc'),
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="text-center mb-20">
        <span className="inline-block rounded-full bg-(--text-secondary)/10 px-4 py-2 text-sm font-medium text-(--text-secondary) mb-6">
          {t('title')}
        </span>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl mb-6">
          D&D <span className="text-(--text-secondary)">Liquid</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-(--text-secondary)">
          {t('description')}
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
            <h2 className="text-2xl font-bold mb-6">{t('missionTitle')}</h2>
            <p className="text-lg text-(--text-secondary) mb-6">
              {t('missionText1')}
            </p>
            <p className="text-lg text-(--text-secondary)">
              {t('missionText2')}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">{t('whyChooseTitle')}</h2>
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
        <h2 className="text-2xl font-bold mb-8 text-center">{t('journeyTitle')}</h2>
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
        <h2 className="text-2xl font-bold mb-4">{t('contactTitle')}</h2>
        <p className="text-(--text-secondary) mb-8 max-w-xl mx-auto">
          {t('contactText')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+37300000000"
            className="rounded-xl bg-(--text-primary) px-6 py-3 font-bold text-(--background) transition-colors hover:bg-(--text-secondary)"
          >
            {t('call')}
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
