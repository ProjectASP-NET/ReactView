"use client";

import { useState } from "react";
import { UserResponseData } from "@/types/auth.types";
import { useUser } from "@/context/UserContext";
import { PAGES } from "@/config/pages.config";
import { Dropdown } from "@/components/UI/Dropdown";
import { Trash2, Edit } from "lucide-react";
import { Link } from 'next-view-transitions';

interface UserTableProps {
  users: UserResponseData[];
  onDelete: (id: number) => void;
  onRoleChange: (id: number, roleId: number) => Promise<void>;
  onRefresh: () => void;
}

const roleOptions = [
  { value: "1", label: "Admin" },
  { value: "2", label: "User" },
  { value: "3", label: "Manager" },
];

export function UserTable({ users, onDelete, onRoleChange }: UserTableProps) {
  const { user: currentUser } = useUser();
  const isAdmin = currentUser?.role.name === "Admin";
  const [changingRole, setChangingRole] = useState<number | null>(null);

  const getRoleBadgeColor = (roleName: string) => {
    switch (roleName) {
      case "Admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "Manager":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "User":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleRoleChange = async (userId: number, roleId: number) => {
    setChangingRole(userId);
    try {
      await onRoleChange(userId, roleId);
    } finally {
      setChangingRole(null);
    }
  };

  return (
    <div className="bg-(--card-bg) border border-(--border) rounded-2xl">
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full">
          <thead className="bg-(--background) border-b border-(--border)">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">Имя</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">Роль</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-(--text-primary)">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border)">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-(--text-secondary)">
                  Пользователи не найдены
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-(--background) transition-colors">
                  <td className="px-6 py-4 text-sm text-(--text-secondary)">#{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-(--text-primary)">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-(--text-secondary)">{user.email}</td>
                  <td className="px-6 py-4">
                    {isAdmin && user.id !== currentUser?.id ? (
                      <Dropdown
                        options={roleOptions}
                        value={String(user.role.id)}
                        onChange={(v) => handleRoleChange(user.id, Number(v))}
                        className="w-32"
                      />
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                          user.role.name
                        )}`}
                      >
                        {user.role.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={PAGES.getAdminUser(user.id)}
                        className="p-2 rounded-lg text-(--text-secondary) hover:bg-(--background) hover:text-(--text-primary) transition-colors"
                        title="Редактировать"
                      >
                        <Edit size={18} />
                      </Link>
                      {isAdmin && user.id !== currentUser?.id && (
                        <button
                          onClick={() => onDelete(user.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
