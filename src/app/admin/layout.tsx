"use client";

import { AdminRoute } from "@/components/Admin/AdminRoute";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-(--background)">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}
