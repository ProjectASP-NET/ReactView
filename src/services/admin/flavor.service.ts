import { apiFetch } from "../api";
import { FlavorDTO } from "@/types/product.types";

export class AdminFlavorService {
  static async getAll(): Promise<FlavorDTO[]> {
    return apiFetch("/flavor", { method: "GET" });
  }

  static async getById(id: number): Promise<FlavorDTO> {
    return apiFetch(`/flavor/${id}`, { method: "GET" });
  }

  static async create(data: Partial<FlavorDTO>): Promise<FlavorDTO> {
    return apiFetch("/flavor", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(id: number, data: Partial<FlavorDTO>): Promise<FlavorDTO> {
    return apiFetch(`/flavor/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/flavor/${id}`, { method: "DELETE" });
  }
}
