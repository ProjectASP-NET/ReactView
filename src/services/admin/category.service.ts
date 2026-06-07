import { apiFetch } from "../api";
import { CategoryDTO } from "@/types/product.types";

export class AdminCategoryService {
  static async getAll(): Promise<CategoryDTO[]> {
    return apiFetch("/category", { method: "GET" });
  }

  static async getById(id: number): Promise<CategoryDTO> {
    return apiFetch(`/category/${id}`, { method: "GET" });
  }

  static async create(data: Partial<CategoryDTO>): Promise<CategoryDTO> {
    return apiFetch("/category", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(id: number, data: Partial<CategoryDTO>): Promise<CategoryDTO> {
    return apiFetch(`/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/category/${id}`, { method: "DELETE" });
  }
}
