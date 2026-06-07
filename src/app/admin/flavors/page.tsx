"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit3, Trash2 } from "lucide-react";
import { AdminFlavorService } from "@/services/admin/flavor.service";
import { FlavorDTO } from "@/types/product.types";

export default function AdminFlavorsPage() {
  const [items, setItems] = useState<FlavorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<FlavorDTO | null>(null);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setError(null); setLoading(true); setItems(await AdminFlavorService.getAll()); }
    catch (e: any) { setError(e.message || "Ошибка загрузки"); console.error(e); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null); setForm({ name: "" }); setShowModal(true);
  };

  const openEdit = (item: FlavorDTO) => {
    setEditing(item); setForm({ name: item.name }); setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await AdminFlavorService.update(editing.id, form);
      else await AdminFlavorService.create(form);
      setShowModal(false); load();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить вкус?")) return;
    try { await AdminFlavorService.delete(id); load(); }
    catch (e) { console.error(e); }
  };

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--text-primary)">Вкусы</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-(--accent) text-white px-4 py-2 rounded-xl font-medium hover:opacity-90"><Plus size={18} /> Добавить</button>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск вкусов..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
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
                <th className="p-4 font-medium">Название</th>
                <th className="p-4 font-medium w-24">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border)">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-(--card-bg)/50">
                  <td className="p-4 text-(--text-muted)">{item.id}</td>
                  <td className="p-4 font-medium text-(--text-primary)">{item.name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-(--accent)/10 text-(--text-muted) hover:text-(--accent)"><Edit3 size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-(--text-muted) hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-(--text-muted)">Вкусы не найдены</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-(--card-bg) rounded-2xl p-6 w-full max-w-md border border-(--border)" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-(--text-primary) mb-4">{editing ? "Редактировать" : "Создать"} вкус</h2>
            <div>
              <label className="block text-sm font-medium text-(--text-secondary) mb-1">Название *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-(--border) text-(--text-secondary) hover:bg-(--background)">Отмена</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-(--accent) text-white font-medium hover:opacity-90">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
