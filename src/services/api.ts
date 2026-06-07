import { siteConfig } from "@/config/site.config";
import { PAGES } from "@/config/pages.config";

const API_URL = siteConfig.api.baseUrl;

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value;
      }
    });
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("redirect_after_auth", window.location.href);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = PAGES.AUTH;
    }
    throw new Error("Unauthorized");
  }

  const data = await response.json();

  if (!response.ok || (data.errorMessage && data.errorMessage.length > 0)) {
    throw new Error(data.errorMessage?.[0] || `API Error: ${response.status}`);
  }
  return data.data || data;
};