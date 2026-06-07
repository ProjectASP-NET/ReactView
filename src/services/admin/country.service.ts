import { apiFetch } from "../api";
import { CountryDTO } from "@/types/product.types";

export class AdminCountryService {
  static async getAll(): Promise<CountryDTO[]> {
    return apiFetch("/country", { method: "GET" });
  }

  static async getById(id: number): Promise<CountryDTO> {
    return apiFetch(`/country/${id}`, { method: "GET" });
  }

  static async create(data: Partial<CountryDTO>): Promise<CountryDTO> {
    return apiFetch("/country", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async update(id: number, data: Partial<CountryDTO>): Promise<CountryDTO> {
    return apiFetch(`/country/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number): Promise<void> {
    return apiFetch(`/country/${id}`, { method: "DELETE" });
  }
}
