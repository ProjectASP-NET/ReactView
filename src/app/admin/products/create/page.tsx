"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminProductService } from "@/services/admin/product.service";
import { PAGES } from "@/config/pages.config";
import { Dropdown } from "@/components/UI/Dropdown";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ProductType = "Liquid" | "Vape" | "Consumable";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
  volume: string;
  nicotine: string;
  iceLevel: string;
  batteryCapacity: string;
  maxPower: string;
  color: string;
  tankCapacity: string;
  coilResistance: string;
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

const typeOptions = [
  { value: "Liquid", label: "Liquid" },
  { value: "Vape", label: "Vape" },
  { value: "Consumable", label: "Consumable" },
];

export default function CreateProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [productType, setProductType] = useState<ProductType>("Liquid");
  const [form, setForm] = useState<ProductForm>({
    name: "", description: "", price: "0", stockQuantity: "0",
    volume: "30", nicotine: "3", iceLevel: "0",
    batteryCapacity: "3000", maxPower: "80", color: "", tankCapacity: "2", coilResistance: "0.5",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: ProductPayload = {
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      };
      if (productType === "Liquid") {
        payload.volume = Number(form.volume);
        payload.nicotine = Number(form.nicotine);
        payload.iceLevel = Number(form.iceLevel);
      } else if (productType === "Vape") {
        payload.batteryCapacity = Number(form.batteryCapacity);
        payload.maxPower = Number(form.maxPower);
        payload.color = form.color;
        payload.tankCapacity = Number(form.tankCapacity);
        payload.coilResistance = Number(form.coilResistance);
      }
      await AdminProductService.create(productType, payload);
      router.push(PAGES.ADMIN_PRODUCTS);
    } catch {
      alert("Ошибка при создании товара");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href={PAGES.ADMIN_PRODUCTS} className="flex items-center gap-2 text-(--text-secondary) hover:text-(--accent) mb-4">
          <ArrowLeft size={20} /> Назад к товарам
        </Link>
        <h1 className="text-4xl font-black text-(--text-primary)">Новый товар</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-(--text-secondary) mb-2">Тип товара</label>
          <Dropdown
            options={typeOptions}
            value={productType}
            onChange={(v) => setProductType(v as ProductType)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Название</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Описание</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) resize-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Цена (MDL)</label>
            <input
              type="number"
              required
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Количество</label>
            <input
              type="number"
              required
              min={0}
              value={form.stockQuantity}
              onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)"
            />
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
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-(--accent) text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Сохранение..." : "Создать"}
          </button>
          <Link
            href={PAGES.ADMIN_PRODUCTS}
            className="px-8 py-3 rounded-xl border border-(--border) text-(--text-primary) font-semibold hover:bg-(--background) transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
