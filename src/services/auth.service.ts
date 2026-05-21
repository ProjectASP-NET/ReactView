import {
  AuthResponseData,
  UserLoginData,
  UserRegisterData,
  ChangePasswordData,
  UserResponseData,
} from "@/types/auth.types";
import { siteConfig } from "@/config/site.config";

const API_URL = siteConfig.api.baseUrl;

export class AuthService {
  static async login(data: UserLoginData): Promise<AuthResponseData> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  }

  static async register(data: UserRegisterData): Promise<AuthResponseData> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  }

  static async changePassword(
    data: ChangePasswordData,
    token: string
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Password change failed");
    }

    return response.json();
  }

  static async getCurrentUser(token: string): Promise<UserResponseData> {
    const response = await fetch(`${API_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  }
}
