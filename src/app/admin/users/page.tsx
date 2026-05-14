"use client";

import { useEffect, useState } from "react";
import { AdminUserService } from "@/services/admin/user.service";
import { UserResponseData } from "@/types/auth.types";
import { UserTable } from "@/components/Admin/Users/UserTable";
import { Search, UserPlus } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminUserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      return;
    }

    try {
      await AdminUserService.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Ошибка при удалении пользователя");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role.name === roleFilter;

    return matchesSearch && matchesRole;
  });

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

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-(--text-primary)">
            Пользователи
          </h1>
          <p className="text-(--text-secondary) mt-2">
            Управление пользователями системы
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={20} />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent)"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent)"
        >
          <option value="all">Все роли</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
      </div>

      <UserTable users={filteredUsers} onDelete={handleDelete} onRefresh={loadUsers} />
    </div>
  );
}
