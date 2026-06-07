import { apiFetch } from "../api";
import { ProductImageDTO } from "@/types/product.types";

export class AdminImageService {
  static async getAll(): Promise<ProductImageDTO[]> {
    return apiFetch("/image", { method: "GET" });
  }

  static async getById(id: number): Promise<ProductImageDTO> {
    return apiFetch(`/image/${id}`, { method: "GET" });
  }

  static async create(data: Partial<ProductImageDTO>): Promise<ProductImageDTO> {
    return apiFetch("/image", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(id: number, data: Partial<ProductImageDTO>): Promise<ProductImageDTO> {
    return apiFetch(`/image/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/image/${id}`, { method: "DELETE" });
  }
}
