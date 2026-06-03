import { BrandDTO } from "@/types/product.types";
import { apiFetch } from "./api";

export class BrandService {
  static async getAllBrands(): Promise<BrandDTO[]> {
    return apiFetch("/brand", { method: "GET" });
  }

  static async getBrandById(id: number): Promise<BrandDTO> {
    return apiFetch(`/brand/${id}`, { method: "GET" });
  }
}
