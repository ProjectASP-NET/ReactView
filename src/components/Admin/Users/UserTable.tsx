"use client";

import { UserResponseData } from "@/types/auth.types";
import { useUser } from "@/context/UserContext";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";

interface UserTableProps {
  users: UserResponseData[];
  onDelete: (id: number) => void;
  onRefresh: () => void;
}

export function UserTable({ users, onDelete }: UserTableProps) {
  const { user: currentUser } = useUser();
  const isAdmin = currentUser?.role.name === "Admin";

  const getRoleBadgeColor = (roleName: string) => {
    switch (roleName) {
      case "Admin":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "User":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="bg-(--card-bg) border border-(--border) rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-(--background) border-b border-(--border)">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">
                ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">
                Имя
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-(--text-primary)">
                Роль
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-(--text-primary)">
                Действия
              </th>
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
                  <td className="px-6 py-4 text-sm text-(--text-secondary)">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-(--text-primary)">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-(--text-secondary)">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                        user.role.name
                      )}`}
                    >
                      {user.role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
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
