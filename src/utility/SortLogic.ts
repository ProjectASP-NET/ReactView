
import { Product } from "../types/Mockdata";

export function SortLogic(products: Product[], sortType: string): Product[] {
  return [...products].sort((a, b) => {
    switch (sortType) {
      case "cheap":
        return a.price - b.price;
      case "expensive":
        return b.price - a.price;
      case "new":
        return Number(b.id) - Number(a.id)
        case "old":
         return Number(a.id) - Number(b.id)
      default:
        return Number(a.id) - Number(b.id)
    }
  });
}