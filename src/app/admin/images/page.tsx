"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Trash2, Star } from "lucide-react";
import { AdminImageService } from "@/services/admin/image.service";
import { ProductImageDTO } from "@/types/product.types";

export default function AdminImagesPage() {
  const [items, setItems] = useState<ProductImageDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ url: "" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setError(null); setLoading(true); setItems(await AdminImageService.getAll()); }
    catch (e: any) { setError(e.message || "Ошибка загрузки"); console.error(e); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    try {
      await AdminImageService.create({ url: form.url, isMain: false, sortOrder: 0 });
      setShowModal(false);
      setForm({ url: "" });
      load();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить изображение?")) return;
    try { await AdminImageService.delete(id); load(); }
    catch (e) { console.error(e); }
  };

  const toggleMain = async (item: ProductImageDTO) => {
    try {
      await AdminImageService.update(item.id, { isMain: !item.isMain });
      load();
    } catch (e) { console.error(e); }
  };

  const filtered = items.filter(i =>
    i.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--text-primary)">Изображения</h1>
        <button onClick={() => { setForm({ url: "" }); setShowModal(true); }} className="flex items-center gap-2 bg-(--accent) text-white px-4 py-2 rounded-xl font-medium hover:opacity-90"><Plus size={18} /> Добавить</button>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск изображений..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="text-center py-20 text-(--text-muted)">Загрузка...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-(--border)">
          <table className="w-full text-sm">
            <thead className="bg-(--card-bg) text-(--text-muted) text-left">
              <tr>
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Превью</th>
                <th className="p-4 font-medium">URL</th>
                <th className="p-4 font-medium">Главная</th>
                <th className="p-4 font-medium">Порядок</th>
                <th className="p-4 font-medium w-24">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border)">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-(--card-bg)/50">
                  <td className="p-4 text-(--text-muted)">{item.id}</td>
                  <td className="p-4">
                    {item.url.startsWith("http") ? (
                      <img src={item.url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-(--card-bg) flex items-center justify-center text-(--text-muted) text-xs">N/A</div>
                    )}
                  </td>
                  <td className="p-4 text-(--text-secondary) max-w-xs truncate">{item.url}</td>
                  <td className="p-4">
                    <button onClick={() => toggleMain(item)} className={`flex items-center gap-1 text-sm ${item.isMain ? "text-yellow-500" : "text-(--text-muted)"}`}>
                      <Star size={16} className={item.isMain ? "fill-yellow-500" : ""} />
                    </button>
                  </td>
                  <td className="p-4 text-(--text-secondary)">{item.sortOrder}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-(--text-muted) hover:text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-(--text-muted)">Изображения не найдены</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-(--card-bg) rounded-2xl p-6 w-full max-w-md border border-(--border)" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-(--text-primary) mb-4">Добавить изображение</h2>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-1">URL *</label>
              <input value={form.url} onChange={e => setForm({ url: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-(--border) text-(--text-secondary) hover:bg-(--background)">Отмена</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-(--accent) text-white font-medium hover:opacity-90">Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
