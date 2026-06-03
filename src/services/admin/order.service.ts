import { apiFetch } from "../api";
import { OrderDTO, OrderStatusUpdateData } from "@/types/admin.types";

export class AdminOrderService {
  static async getAll(): Promise<OrderDTO[]> {
    return apiFetch("/order", { method: "GET" });
  }

  static async getById(id: number): Promise<OrderDTO> {
    return apiFetch(`/order/${id}`, { method: "GET" });
  }

  static async updateStatus(id: number, data: OrderStatusUpdateData): Promise<OrderDTO> {
    return apiFetch(`/order/${id}/status`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/order/${id}`, { method: "DELETE" });
  }
}
