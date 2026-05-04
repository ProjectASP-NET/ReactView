"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
interface BackendProduct {
  id: number;
  name: string;
  description?: string;
  status: number;
  type: number;
  price: number;
  stockQuantity: number;
  likeCount: number;
  brand?: {
    id: number;
    name: string;
    description?: string;
    logoUrl?: string;
  };
  category?: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  images: Array<{
    id: number;
    url: string;
    productId: number;
  }>;
}

export default function TestApiPage() {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5131/api/Product");

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const result = await response.json();
        const items = result.data || result;

        console.log("Данные с бэкенда:", items);
        console.log("Первый продукт:", items[0]);
        console.log("Images первого продукта:", items[0]?.images);
        console.log("Brand первого продукта:", items[0]?.brand);
        setProducts(items);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center text-xl">Стучимся на бекенд... ⏳</div>;

  if (error) return (
    <div className="p-10 text-center text-red-500">
      <h2>Упс, связи нет!</h2>
      <p>{error}</p>
      <p className="text-sm mt-2">P.S. Проверь включен ли CORS в Program.cs и запущен ли сам ASP.NET проект.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-(--text-primary)">
        Данные с бекенда D&DLiquid:
      </h1>

      {products.length === 0 ? (
        <p>Бекенд ответил, но товаров в базе пока нет (пустой массив).</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageUrl = product.images?.[0]?.url;
            const brandName = product.brand?.name || 'Без бренда';

            const hasValidImage = imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'));

            return (
              <div key={product.id} className="border rounded-lg p-4 bg-white shadow">
                <div className="relative w-full h-48 mb-4 bg-gray-100 rounded">
                  {hasValidImage ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Нет изображения
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 uppercase mb-1">{brandName}</p>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-green-600 mb-2">
                  {product.price} MDL
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>❤️ Лайков: {product.likeCount}</p>
                  <p>📦 На складе: {product.stockQuantity}</p>
                  {product.category && <p>🏷️ {product.category.name}</p>}
                  {product.tags.length > 0 && (
                    <p>🏷️ Теги: {product.tags.map(t => t.name).join(', ')}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 p-4 bg-gray-800 rounded-lg text-green-400 font-mono text-sm overflow-auto">
        <h3>Сырой JSON ответ:</h3>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
    </div>
  );
}