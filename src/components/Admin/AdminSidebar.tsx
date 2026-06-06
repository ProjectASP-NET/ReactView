"use client";

import { Link } from 'next-view-transitions';
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { PAGES } from "@/config/pages.config";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  adminOnly?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", href: PAGES.ADMIN, icon: LayoutDashboard },
  { name: "Пользователи", href: PAGES.ADMIN_USERS, icon: Users, adminOnly: true },
  { name: "Товары", href: PAGES.ADMIN_PRODUCTS, icon: Package },
  { name: "Заказы", href: PAGES.ADMIN_ORDERS, icon: ShoppingCart },
  { name: "Аналитика", href: PAGES.ADMIN_ANALYTICS, icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const isAdmin = user?.role.name === "Admin";

  const filteredMenuItems = menuItems.filter(item =>
    !item.adminOnly || isAdmin
  );

  return (
    <aside className="w-64 bg-(--card-bg) border-r border-(--border) flex flex-col">
      <div className="p-6 border-b border-(--border)">
        <h1 className="text-2xl font-black text-(--text-primary)">
          D&D <span className="text-(--text-muted)">ADMIN</span>
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          {user?.role.name}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-(--accent) text-white"
                  : "text-(--text-secondary) hover:bg-(--background) hover:text-(--text-primary)"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-(--border)">
        <Link
          href={PAGES.HOME}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-(--text-secondary) hover:bg-(--background) hover:text-(--text-primary) transition-colors mb-2"
        >
          <Settings size={20} />
          <span>Вернуться на сайт</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}
