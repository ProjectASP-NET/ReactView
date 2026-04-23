"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/Product/ProductCard";
import { Product } from "@/types/Mockdata";

export default function TestApiPage() {
  const [products, setProducts] = useState<Product[]>([]);
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <div className="mt-10 p-4 bg-gray-800 rounded-lg text-green-400 font-mono text-sm overflow-auto">
        <h3>Сырой JSON ответ:</h3>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
    </div>
  );
}