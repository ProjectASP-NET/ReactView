import { apiFetch } from "../api";
import { BrandDTO } from "@/types/product.types";

export class AdminBrandService {
  static async getAll(): Promise<BrandDTO[]> {
    return apiFetch("/brand", { method: "GET" });
  }

  static async getById(id: number): Promise<BrandDTO> {
    return apiFetch(`/brand/${id}`, { method: "GET" });
  }

  static async create(data: Partial<BrandDTO>): Promise<BrandDTO> {
    return apiFetch("/brand", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(id: number, data: Partial<BrandDTO>): Promise<BrandDTO> {
    return apiFetch(`/brand/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/brand/${id}`, { method: "DELETE" });
  }
}
