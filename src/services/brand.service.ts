import { siteConfig } from "@/config/site.config";
import { BrandDTO } from "@/types/product.types";

const API_URL = siteConfig.api.baseUrl;

export class BrandService {
  static async getAllBrands(): Promise<BrandDTO[]> {
    const response = await fetch(`${API_URL}/brand`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    return response.json();
  }

  static async getBrandById(id: number): Promise<BrandDTO> {
    const response = await fetch(`${API_URL}/brand/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brand with id ${id}`);
    }

    const result = await response.json();
    return result.data || result;
  }
}
