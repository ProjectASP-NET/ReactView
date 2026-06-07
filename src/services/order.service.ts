import { apiFetch } from "./api";
import { OrderDTO, OrderCreateData } from "@/types/admin.types";

export class OrderService {
  static async create(data: OrderCreateData): Promise<OrderDTO> {
    return apiFetch("/order", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async getMyOrders(): Promise<OrderDTO[]> {
    return apiFetch("/order/my", { method: "GET" });
  }
}