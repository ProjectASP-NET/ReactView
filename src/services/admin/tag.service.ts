import { apiFetch } from "../api";
import { TagDTO } from "@/types/product.types";

export class AdminTagService {
  static async getAll(): Promise<TagDTO[]> {
    return apiFetch("/tag", { method: "GET" });
  }

  static async getById(id: number): Promise<TagDTO> {
    return apiFetch(`/tag/${id}`, { method: "GET" });
  }

  static async create(data: Partial<TagDTO>): Promise<TagDTO> {
    return apiFetch("/tag", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(id: number, data: Partial<TagDTO>): Promise<TagDTO> {
    return apiFetch(`/tag/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/tag/${id}`, { method: "DELETE" });
  }
}
