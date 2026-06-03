import { ProductDTO, LiquidDTO, VapeDTO, ConsumableDTO } from "@/types/product.types";
import { apiFetch } from "./api";

export class ProductService {
  static async getAllProducts(): Promise<ProductDTO[]> {
    return apiFetch("/product", { method: "GET" });
  }

  static async getLiquids(): Promise<LiquidDTO[]> {
    return apiFetch("/liquid", { method: "GET" });
  }

  static async getVapes(): Promise<VapeDTO[]> {
    return apiFetch("/vape", { method: "GET" });
  }

  static async getConsumables(): Promise<ConsumableDTO[]> {
    return apiFetch("/consumable", { method: "GET" });
  }

  static async getProductById(id: number): Promise<ProductDTO> {
    return apiFetch(`/product/${id}`, { method: "GET" });
  }

  static async getLiquidById(id: number): Promise<LiquidDTO> {
    return apiFetch(`/liquid/${id}`, { method: "GET" });
  }

  static async getVapeById(id: number): Promise<VapeDTO> {
    return apiFetch(`/vape/${id}`, { method: "GET" });
  }

  static async getConsumableById(id: number): Promise<ConsumableDTO> {
    return apiFetch(`/consumable/${id}`, { method: "GET" });
  }
}
