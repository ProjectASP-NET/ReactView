"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { AdminOrderService } from "@/services/admin/order.service";
import { OrderDTO, OrderStatusEnum } from "@/types/admin.types";
import { PAGES } from "@/config/pages.config";
import { Dropdown } from "@/components/UI/Dropdown";

const statusLabels: Record<string, string> = {
  Pending: "Ожидает",
  Confirmed: "Подтверждён",
  Processing: "В обработке",
  Shipped: "Отправлен",
  Delivered: "Доставлен",
  Cancelled: "Отменён",
  Refunded: "Возврат",
};

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Refunded: "bg-gray-100 text-gray-700",
};

const filterOptions = [
  { value: "all", label: "Все статусы" },
  { value: "Pending", label: "Ожидает" },
  { value: "Confirmed", label: "Подтверждён" },
  { value: "Processing", label: "В обработке" },
  { value: "Shipped", label: "Отправлен" },
  { value: "Delivered", label: "Доставлен" },
  { value: "Cancelled", label: "Отменён" },
  { value: "Refunded", label: "Возврат" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await AdminOrderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот заказ?")) return;
    try {
      await AdminOrderService.delete(id);
      setOrders(orders.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Ошибка при удалении заказа");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || OrderStatusEnum[order.status] === statusFilter;
    return matchesSearch && matchesStatus;
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
      <div className="mb-8">
        <h1 className="text-4xl font-black text-(--text-primary)">Заказы</h1>
        <p className="text-(--text-secondary) mt-2">Управление заказами клиентов</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={20} />
          <input
            type="text"
            placeholder="Поиск по номеру или адресу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent)"
          />
        </div>
        <Dropdown
          options={filterOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          className="w-48"
        />
      </div>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--border)">
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">ID</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Номер</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Статус</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Сумма</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Дата</th>
              <th className="text-right p-4 text-sm font-medium text-(--text-secondary)">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-(--text-secondary)">
                  Заказы не найдены
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-(--border) hover:bg-(--background)/50">
                  <td className="p-4 text-sm text-(--text-primary)">{order.id}</td>
                  <td className="p-4 text-sm font-medium text-(--text-primary)">{order.orderNumber}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[OrderStatusEnum[order.status]] || ""}`}>
                      {statusLabels[OrderStatusEnum[order.status]] || OrderStatusEnum[order.status]}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-(--text-primary)">{order.totalAmount.toLocaleString()} MDL</td>
                  <td className="p-4 text-sm text-(--text-primary)">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={PAGES.getAdminOrder(order.id)}
                        className="p-2 rounded-lg hover:bg-(--background) text-(--text-secondary) hover:text-(--accent) transition-colors"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 rounded-lg hover:bg-(--background) text-(--text-secondary) hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
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
