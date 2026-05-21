"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { ProductDTO, LiquidDTO, VapeDTO, ConsumableDTO, ProductUnion } from "@/types/product.types";
import { ProductService } from "@/services/product.service";
import { Product } from "@/types/product.types";
import { ProductAdapter } from "@/adapters/product.adapter";

interface ProductContextType {
  products: Product[];
  productsDTO: ProductUnion[];
  liquids: Product[];
  vapes: Product[];
  consumables: Product[];
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductDTOById: (id: number) => ProductUnion | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productsDTO, setProductsDTO] = useState<ProductUnion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load from specific endpoints now that they have Eager Loading
      const [liquidsData, vapesData, consumablesData] = await Promise.all([
        ProductService.getLiquids(),
        ProductService.getVapes(),
        ProductService.getConsumables(),
      ]);

      const allProductsDTO: ProductUnion[] = [
        ...liquidsData,
        ...vapesData,
        ...consumablesData,
      ];

      setProductsDTO(allProductsDTO);

      const mockFormatProducts = ProductAdapter.toMockFormatArray(allProductsDTO);
      setProducts(mockFormatProducts);
    } catch (err: any) {
      console.error("Failed to load products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const refreshProducts = useCallback(async () => {
    await loadProducts();
  }, [loadProducts]);

  const getProductById = useCallback((id: string): Product | undefined => {
    return products.find(p => p.id === id);
  }, [products]);

  const getProductDTOById = useCallback((id: number): ProductUnion | undefined => {
    return productsDTO.find(p => p.id === id);
  }, [productsDTO]);

  const liquids = products.filter(p => p.type === 'liquid');
  const vapes = products.filter(p => p.type === 'vape');
  const consumables = products.filter(p => p.type === 'consumables');

  return (
    <ProductContext.Provider
      value={{
        products,
        productsDTO,
        liquids,
        vapes,
        consumables,
        isLoading,
        error,
        refreshProducts,
        getProductById,
        getProductDTOById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
