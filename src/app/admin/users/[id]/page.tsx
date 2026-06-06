"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminUserService } from "@/services/admin/user.service";
import { UserResponseData } from "@/types/auth.types";
import { PAGES } from "@/config/pages.config";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from 'next-view-transitions';

export default function UserEditPage() {
  const router = useRouter();
  const params = useParams();
  const userId = parseInt(params.id as string);

  const [user, setUser] = useState<UserResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await AdminUserService.getUserById(userId);
      setUser(data);
      setFormData({
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      console.error("Failed to load user:", error);
      alert("Ошибка загрузки пользователя");
      router.push(PAGES.ADMIN_USERS);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await AdminUserService.updateUser(userId, formData);
      alert("Пользователь успешно обновлен");
      router.push(PAGES.ADMIN_USERS);
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Ошибка при обновлении пользователя");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-(--text-secondary)">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href={PAGES.ADMIN_USERS}
          className="inline-flex items-center gap-2 text-(--text-secondary) hover:text-(--text-primary) mb-4"
        >
          <ArrowLeft size={20} />
          Назад к списку
        </Link>
        <h1 className="text-4xl font-black text-(--text-primary)">
          Редактирование пользователя
        </h1>
        <p className="text-(--text-secondary) mt-2">
          ID: {user.id} • Роль: {user.role.name}
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Имя пользователя
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-(--accent) text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Save size={20} />
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
              <Link
                href={PAGES.ADMIN_USERS}
                className="px-6 py-3 rounded-xl border border-(--border) text-(--text-secondary) font-semibold hover:bg-(--background) transition-colors"
              >
                Отмена
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
