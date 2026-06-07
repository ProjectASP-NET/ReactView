import { apiFetch } from "./api";
import { CategoryDTO } from "@/types/product.types";

export class CategoryService {
  static async getAll(): Promise<CategoryDTO[]> {
    return apiFetch("/category", { method: "GET" });
  }
}
