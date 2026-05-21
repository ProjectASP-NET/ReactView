import { ProductDTO, LiquidDTO, VapeDTO, ConsumableDTO, ProductUnion } from "@/types/product.types";
import { siteConfig } from "@/config/site.config";

const API_URL = siteConfig.api.baseUrl;

export class ProductService {
  static async getAllProducts(): Promise<ProductDTO[]> {
    const response = await fetch(`${API_URL}/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  }

  static async getLiquids(): Promise<LiquidDTO[]> {
    const response = await fetch(`${API_URL}/liquid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch liquids");
    }

    return response.json();
  }

  static async getVapes(): Promise<VapeDTO[]> {
    const response = await fetch(`${API_URL}/vape`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch vapes");
    }

    return response.json();
  }

  static async getConsumables(): Promise<ConsumableDTO[]> {
    const response = await fetch(`${API_URL}/consumable`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch consumables");
    }

    return response.json();
  }

  static async getProductById(id: number): Promise<ProductDTO> {
    const response = await fetch(`${API_URL}/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }

    const result = await response.json();
    return result.data || result;
  }

  static async getLiquidById(id: number): Promise<LiquidDTO> {
    const response = await fetch(`${API_URL}/liquid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch liquid with id ${id}`);
    }

    const result = await response.json();
    return result.data || result;
  }

  static async getVapeById(id: number): Promise<VapeDTO> {
    const response = await fetch(`${API_URL}/vape/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch vape with id ${id}`);
    }

    const result = await response.json();
    return result.data || result;
  }

  static async getConsumableById(id: number): Promise<ConsumableDTO> {
    const response = await fetch(`${API_URL}/consumable/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch consumable with id ${id}`);
    }

    const result = await response.json();
    return result.data || result;
  }
}
