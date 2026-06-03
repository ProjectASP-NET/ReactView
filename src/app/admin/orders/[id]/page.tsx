"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminOrderService } from "@/services/admin/order.service";
import { OrderDTO, OrderStatusEnum } from "@/types/admin.types";
import { PAGES } from "@/config/pages.config";
import { Dropdown } from "@/components/UI/Dropdown";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  Pending: "Ожидает",
  Confirmed: "Подтверждён",
  Processing: "В обработке",
  Shipped: "Отправлен",
  Delivered: "Доставлен",
  Cancelled: "Отменён",
  Refunded: "Возврат",
};

const statusOptions = Object.values(OrderStatusEnum)
  .filter((v) => typeof v === "number")
  .map((v) => ({ value: String(v), label: statusLabels[OrderStatusEnum[v as number]] || OrderStatusEnum[v as number] }));

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const data = await AdminOrderService.getById(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (value: string) => {
    const newStatus = Number(value) as OrderStatusEnum;
    setUpdating(true);
    try {
      const updated = await AdminOrderService.updateStatus(orderId, { status: newStatus });
      setOrder(updated);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Ошибка при обновлении статуса");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <p className="text-(--text-secondary)">Заказ не найден</p>
        <Link href={PAGES.ADMIN_ORDERS} className="text-(--accent) hover:underline">Назад к заказам</Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <Link href={PAGES.ADMIN_ORDERS} className="flex items-center gap-2 text-(--text-secondary) hover:text-(--accent) mb-6">
        <ArrowLeft size={20} /> Назад к заказам
      </Link>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-(--text-primary)">{order.orderNumber}</h1>
            <p className="text-(--text-secondary) text-sm mt-1">
              Создан: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span className="text-lg font-semibold text-(--text-primary)">
            {order.totalAmount.toLocaleString()} MDL
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-medium text-(--text-secondary) mb-1">Адрес доставки</p>
            <p className="text-(--text-primary)">{order.deliveryAddress}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-(--text-secondary) mb-1">Комментарий</p>
            <p className="text-(--text-primary)">{order.comment || "—"}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-(--text-secondary) mb-2">Статус</p>
          <div className="flex items-center gap-2">
            <Dropdown
              options={statusOptions}
              value={String(order.status)}
              onChange={handleStatusChange}
              className="w-48"
            />
            {updating && <span className="text-sm text-(--text-secondary)">Обновление...</span>}
          </div>
        </div>
      </div>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold text-(--text-primary) p-6 pb-0">Товары в заказе</h2>
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b border-(--border)">
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Товар</th>
              <th className="text-right p-4 text-sm font-medium text-(--text-secondary)">Цена</th>
              <th className="text-right p-4 text-sm font-medium text-(--text-secondary)">Кол-во</th>
              <th className="text-right p-4 text-sm font-medium text-(--text-secondary)">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-(--border)">
                <td className="p-4 text-sm text-(--text-primary)">{item.productName}</td>
                <td className="p-4 text-sm text-(--text-primary) text-right">{item.price.toLocaleString()} MDL</td>
                <td className="p-4 text-sm text-(--text-primary) text-right">{item.quantity}</td>
                <td className="p-4 text-sm text-(--text-primary) text-right font-semibold">
                  {(item.price * item.quantity).toLocaleString()} MDL
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-(--background)">
              <td colSpan={3} className="p-4 text-sm font-bold text-(--text-primary) text-right">Итого</td>
              <td className="p-4 text-sm font-bold text-(--text-primary) text-right">
                {order.totalAmount.toLocaleString()} MDL
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
