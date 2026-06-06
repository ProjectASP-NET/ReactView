"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminProductService } from "@/services/admin/product.service";
import { ProductUnion, isLiquid, isVape } from "@/types/product.types";
import { PAGES } from "@/config/pages.config";
import { ArrowLeft } from "lucide-react";
import { Link } from 'next-view-transitions';

type ProductType = "Liquid" | "Vape" | "Consumable";

interface ProductForm {
  name?: string;
  description?: string;
  price?: string;
  stockQuantity?: string;
  volume?: string;
  nicotine?: string;
  iceLevel?: string;
  batteryCapacity?: string;
  maxPower?: string;
  color?: string;
  tankCapacity?: string;
  coilResistance?: string;
}

interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  volume?: number;
  nicotine?: number;
  iceLevel?: number;
  batteryCapacity?: number;
  maxPower?: number;
  color?: string;
  tankCapacity?: number;
  coilResistance?: number;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState<ProductUnion | null>(null);
  const [productType, setProductType] = useState<ProductType>("Consumable");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProductForm>({});

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const data = await AdminProductService.getById(productId);
      setProduct(data);
      const type = isLiquid(data) ? "Liquid" : isVape(data) ? "Vape" : "Consumable";
      setProductType(type);
      setForm({
        name: data.name,
        description: data.description || "",
        price: String(data.price),
        stockQuantity: String(data.stockQuantity),
        ...(isLiquid(data) ? {
          volume: String(data.volume), nicotine: String(data.nicotine), iceLevel: String(data.iceLevel),
        } : {}),
        ...(isVape(data) ? {
          batteryCapacity: String(data.batteryCapacity), maxPower: String(data.maxPower),
          color: data.color, tankCapacity: String(data.tankCapacity), coilResistance: String(data.coilResistance),
        } : {}),
      });
    } catch {
      console.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: ProductPayload = {
        name: form.name ?? "",
        description: form.description || undefined,
        price: Number(form.price ?? 0),
        stockQuantity: Number(form.stockQuantity ?? 0),
      };
      if (productType === "Liquid") {
        payload.volume = Number(form.volume);
        payload.nicotine = Number(form.nicotine);
        payload.iceLevel = Number(form.iceLevel);
      } else if (productType === "Vape") {
        payload.batteryCapacity = Number(form.batteryCapacity);
        payload.maxPower = Number(form.maxPower);
        payload.color = form.color ?? "";
        payload.tankCapacity = Number(form.tankCapacity);
        payload.coilResistance = Number(form.coilResistance);
      }
      await AdminProductService.update(productType, productId, payload);
      router.push(PAGES.ADMIN_PRODUCTS);
    } catch {
      alert("Ошибка при обновлении товара");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8">
        <p className="text-(--text-secondary)">Товар не найден</p>
        <Link href="/admin/products" className="text-(--accent) hover:underline">Назад к товарам</Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href={PAGES.ADMIN_PRODUCTS} className="flex items-center gap-2 text-(--text-secondary) hover:text-(--accent) mb-4">
          <ArrowLeft size={20} /> Назад к товарам
        </Link>
        <h1 className="text-4xl font-black text-(--text-primary)">Редактировать: {product.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Название</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Описание</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) resize-none" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Цена (MDL)</label>
            <input type="number" required min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Количество</label>
            <input type="number" required min={0} value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
          </div>
        </div>

        {productType === "Liquid" && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Volume (ml)</label>
              <input type="number" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Nicotine (mg)</label>
              <input type="number" value={form.nicotine} onChange={(e) => setForm({ ...form, nicotine: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Ice Level (%)</label>
              <input type="number" value={form.iceLevel} onChange={(e) => setForm({ ...form, iceLevel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
          </div>
        )}

        {productType === "Vape" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Battery (mAh)</label>
              <input type="number" value={form.batteryCapacity} onChange={(e) => setForm({ ...form, batteryCapacity: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Max Power (W)</label>
              <input type="number" value={form.maxPower} onChange={(e) => setForm({ ...form, maxPower: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Color</label>
              <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Tank (ml)</label>
              <input type="number" step="0.1" value={form.tankCapacity} onChange={(e) => setForm({ ...form, tankCapacity: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Coil (ohm)</label>
              <input type="number" step="0.01" value={form.coilResistance} onChange={(e) => setForm({ ...form, coilResistance: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving}
            className="px-8 py-3 rounded-xl bg-(--accent) text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <Link href={PAGES.ADMIN_PRODUCTS}
            className="px-8 py-3 rounded-xl border border-(--border) text-(--text-primary) font-semibold hover:bg-(--background) transition-colors">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
