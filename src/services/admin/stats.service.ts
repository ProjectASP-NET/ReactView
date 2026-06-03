import { apiFetch } from "../api";
import { AdminStatsDTO } from "@/types/admin.types";

export class AdminStatsService {
  static async getStats(): Promise<AdminStatsDTO> {
    return apiFetch("/admin/stats", { method: "GET" });
  }
}
