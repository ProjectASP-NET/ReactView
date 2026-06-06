# D&DLiquid — Frontend

Фронтенд интернет-магазина **"D&DLiquid"**

## Стек

| Технология | Назначение |
|------------|-----------|
| **Next.js 16** (App Router) | Фреймворк |
| **React 19** | UI-библиотека |
| **TypeScript 5** | Типизация (strict mode) |
| **Tailwind CSS 4** | Стилизация |
| **Framer Motion** | Анимации |
| **Embla Carousel React** | Карусели |
| **Recharts** | Графики в админ-панели |
| **Lucide React** | Иконки |
| **Headless UI** | Accessibility-компоненты |
| **next-view-transitions** | Плавные переходы между страницами |
| **React Context API** | Управление состоянием (Theme, Auth, Cart, Compare, Favorites) |
| **Vitest + React Testing Library + jsdom** | Модульное тестирование |
| **ESLint 9** (flat config) | Линтинг |
| **React Compiler** | Автоматическая мемоизация |
| **PostCSS** | Сборка CSS |

## Структура проекта

```
src/
├── app/                     # Next.js App Router (страницы)
│   ├── (publicpages)/       # Публичные страницы (каталог, корзина, профиль)
│   ├── auth/                # Авторизация
│   └── admin/               # Админ-панель (дашборд, заказы, товары, пользователи)
├── components/              # UI-компоненты
│   ├── Admin/               # Админка: Sidebar, UserTable
│   ├── Auth/                # Формы, переключатели
│   ├── Buttons/             # AddToCart, Like, Favorite
│   ├── Filters/             # Filter, Sort, Search, Pagination
│   ├── Layout/              # Header, Footer, Navigation
│   ├── Modal/               # AgeModal, ProductModal
│   ├── Product/             # ProductCard, ImageGallery, HitProducts
│   └── UI/                  # Toast, Skeleton, FadeIn, ThemeToggle
├── context/                 # Context providers (6 шт)
├── services/                # API-клиенты
├── types/                   # TypeScript-типы и интерфейсы
├── adapters/                # Мапперы DTO → Frontend Model
├── utility/                 # Утилиты (сортировка)
├── config/                  # Конфигурация (роуты, site.config)
└── __tests__/               # Тесты
public/                      # Статика (изображения, видео)
```

## Запуск

### Локально

```bash
npm install
npm run dev   
```

### Docker

```bash
docker compose up -d --build frontend
```

### Тесты

```bash
npm run test       
npm run test:run   
```
## Deploy

Проект задеплоин на Vercel 

