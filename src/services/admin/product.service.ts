import { apiFetch } from "../api";
import { ProductUnion } from "@/types/product.types";

type ProductApiType = "product" | "liquid" | "vape" | "consumable";

export class AdminProductService {
  static async getAll(): Promise<ProductUnion[]> {
    const [liquids, vapes, consumables] = await Promise.all([
      apiFetch("/liquid", { method: "GET" }),
      apiFetch("/vape", { method: "GET" }),
      apiFetch("/consumable", { method: "GET" }),
    ]);
    return [...liquids, ...vapes, ...consumables];
  }

  static async getById(id: number): Promise<ProductUnion> {
    return apiFetch(`/product/${id}`, { method: "GET" });
  }

  static async getByType(type: ProductApiType, id: number): Promise<ProductUnion> {
    return apiFetch(`/${type}/${id}`, { method: "GET" });
  }

  static async create(type: "Liquid" | "Vape" | "Consumable", data: Partial<ProductUnion>): Promise<ProductUnion> {
    const endpoint = type.toLowerCase();
    return apiFetch(`/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(type: "Liquid" | "Vape" | "Consumable", id: number, data: Partial<ProductUnion>): Promise<ProductUnion> {
    const endpoint = type.toLowerCase();
    return apiFetch(`/${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/product/${id}`, { method: "DELETE" });
  }
}
