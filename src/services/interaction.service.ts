import { siteConfig } from "@/config/site.config";
import { apiFetch } from "./api";

const API_URL = siteConfig.api.baseUrl;

export class InteractionService {
  static async toggleLike(productId: number): Promise<{ isLiked: boolean; likeCount: number }> {
    return apiFetch(`/interaction/product/${productId}/like`, { method: "POST" });
  }

  static async toggleFavorite(productId: number): Promise<{ isFavorited: boolean }> {
    return apiFetch(`/interaction/product/${productId}/favorite`, { method: "POST" });
  }

  static async getMyLikes(): Promise<number[]> {
    return apiFetch("/interaction/me/likes");
  }

  static async getMyFavorites(): Promise<number[]> {
    return apiFetch("/interaction/me/favorites");
  }
}
