import {
  AuthResponseData,
  UserLoginData,
  UserRegisterData,
  ChangePasswordData,
  UserResponseData,
} from "@/types/auth.types";
import { apiFetch } from "./api";

export class AuthService {
  static async login(data: UserLoginData): Promise<AuthResponseData> {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async register(data: UserRegisterData): Promise<AuthResponseData> {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async changePassword(
    data: ChangePasswordData,
    _token: string
  ): Promise<{ message: string }> {
    return apiFetch("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async getCurrentUser(_token: string): Promise<UserResponseData> {
    return apiFetch("/user/me", { method: "GET" });
  }
}
