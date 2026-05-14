import { apiFetch } from "../api";
import { UserResponseData, UserUpdateData } from "@/types/auth.types";

export class AdminUserService {
  static async getAllUsers(): Promise<UserResponseData[]> {
    return apiFetch("/user/all", {
      method: "GET",
    });
  }

  static async getUserById(id: number): Promise<UserResponseData> {
    return apiFetch(`/user/${id}`, {
      method: "GET",
    });
  }

  static async updateUser(id: number, data: UserUpdateData): Promise<UserResponseData> {
    return apiFetch(`/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async deleteUser(id: number): Promise<void> {
    return apiFetch(`/user/${id}`, {
      method: "DELETE",
    });
  }
}
