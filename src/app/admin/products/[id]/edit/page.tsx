"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminProductService } from "@/services/admin/product.service";
import { BrandDTO, CategoryDTO, TagDTO, FlavorDTO, ProductUnion, isLiquid, isVape } from "@/types/product.types";
import { AdminBrandService } from "@/services/admin/brand.service";
import { AdminCategoryService } from "@/services/admin/category.service";
import { AdminTagService } from "@/services/admin/tag.service";
import { AdminFlavorService } from "@/services/admin/flavor.service";
import { PAGES } from "@/config/pages.config";
import { Dropdown } from "@/components/UI/Dropdown";
import { ArrowLeft } from "lucide-react";
import { Link } from 'next-view-transitions';

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
  brandId: string;
  categoryId: string;
  tagIds: string;
  flavorIds: string;
}

const typeOptions = [
  { value: "Liquid", label: "Liquid" },
  { value: "Vape", label: "Vape" },
  { value: "Consumable", label: "Consumable" },
];

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState<ProductType>("Liquid");
  const [brands, setBrands] = useState<BrandDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [flavors, setFlavors] = useState<FlavorDTO[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "", description: "", price: "0", stockQuantity: "0",
    volume: "30", nicotine: "3", iceLevel: "0",
    batteryCapacity: "3000", maxPower: "80", color: "", tankCapacity: "2", coilResistance: "0.5",
    brandId: "", categoryId: "", tagIds: "", flavorIds: "",
  });

  useEffect(() => {
    const typeParam = new URLSearchParams(window.location.search).get("type") as ProductType | null;

    const fetchProduct = typeParam
      ? AdminProductService.getByType(typeParam.toLowerCase() as "liquid" | "vape" | "consumable", Number(id))
      : AdminProductService.getById(Number(id));

    Promise.all([
      fetchProduct,
      AdminBrandService.getAll(),
      AdminCategoryService.getAll(),
      AdminTagService.getAll(),
      AdminFlavorService.getAll(),
    ]).then(([product, b, c, t, f]) => {
      setBrands(b);
      setCategories(c);
      setTags(t);
      setFlavors(f);

      const type = typeParam || (isLiquid(product) ? "Liquid" : isVape(product) ? "Vape" : "Consumable");
      setProductType(type);

      setForm({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        stockQuantity: product.stockQuantity.toString(),
        volume: isLiquid(product) ? product.volume.toString() : "30",
        nicotine: isLiquid(product) ? product.nicotine.toString() : "3",
        iceLevel: isLiquid(product) ? product.iceLevel.toString() : "0",
        batteryCapacity: isVape(product) ? product.batteryCapacity.toString() : "3000",
        maxPower: isVape(product) ? product.maxPower.toString() : "80",
        color: isVape(product) ? product.color : "",
        tankCapacity: isVape(product) ? product.tankCapacity.toString() : "2",
        coilResistance: isVape(product) ? product.coilResistance.toString() : "0.5",
        brandId: product.brand?.id?.toString() || "",
        categoryId: product.category?.id?.toString() || "",
        tagIds: product.tags.map(t => t.id).join(","),
        flavorIds: isLiquid(product) ? product.flavors.map(f => f.id).join(",") : "",
      });
      setLoading(false);
    }).catch(() => {
      alert("Ошибка загрузки товара");
      router.push(PAGES.ADMIN_PRODUCTS);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      };
      if (form.brandId) payload.brandId = Number(form.brandId);
      if (form.categoryId) payload.categoryId = Number(form.categoryId);
      if (form.tagIds) payload.tagIds = form.tagIds.split(",").filter(Boolean).map(Number);
      if (form.flavorIds && productType === "Liquid") {
        payload.flavorIds = form.flavorIds.split(",").filter(Boolean).map(Number);
      }
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
      await AdminProductService.update(productType, Number(id), payload);
      router.push(PAGES.ADMIN_PRODUCTS);
    } catch {
      alert("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href={PAGES.ADMIN_PRODUCTS} className="flex items-center gap-2 text-(--text-secondary) hover:text-(--accent) mb-4">
          <ArrowLeft size={20} /> Назад к товарам
        </Link>
        <h1 className="text-4xl font-black text-(--text-primary)">Редактировать товар</h1>
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Бренд</label>
            <Dropdown
              options={[
                { value: "", label: "Без бренда" },
                ...brands.map(b => ({ value: b.id.toString(), label: b.name })),
              ]}
              value={form.brandId}
              onChange={(v) => setForm({ ...form, brandId: v })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Категория</label>
            <Dropdown
              options={[
                { value: "", label: "Без категории" },
                ...categories.map(c => ({ value: c.id.toString(), label: c.name })),
              ]}
              value={form.categoryId}
              onChange={(v) => setForm({ ...form, categoryId: v })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2">Теги (ID, через запятую)</label>
            <input value={form.tagIds} onChange={(e) => setForm({ ...form, tagIds: e.target.value })}
              placeholder="1,2,3"
              className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
            <p className="text-xs text-(--text-muted) mt-1">{tags.map(t => `${t.id}:${t.name}`).join(", ")}</p>
          </div>
          {productType === "Liquid" && (
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-2">Вкусы (ID, через запятую)</label>
              <input value={form.flavorIds} onChange={(e) => setForm({ ...form, flavorIds: e.target.value })}
                placeholder="1,2,3"
                className="w-full px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)" />
              <p className="text-xs text-(--text-muted) mt-1">{flavors.map(f => `${f.id}:${f.name}`).join(", ")}</p>
            </div>
          )}
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
