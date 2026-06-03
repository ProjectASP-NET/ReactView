export interface ProductBase {
  id: string;
  name: string;
  price: number;
  img: string;
  brand?: string;
  brandId?: number;
  description?: string;
  InStock: boolean;
  LikeCount: number;
}

export interface ILiquid extends ProductBase {
  type: 'liquid';
  volume: 10 | 30 | 50 | 100;
  flavor: string[];
  nicotine: number;
  Icelevel: 0 | 25 | 50 | 75 | 100;
}

export interface IVape extends ProductBase {
  type: 'vape';
  batteryCapacity: number;
  maxPower: number;
  color: string;
  TankCapacity: number;
  CoilResistence: number;
}

export interface IConsumables extends ProductBase {
  type: 'consumables';
}

export type Product = ILiquid | IVape | IConsumables;

export interface CountryDTO {
  id: number;
  name: string;
  code: string;
}

export interface BrandDTO {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  country?: CountryDTO;
  products?: ProductUnion[];
}

export interface CategoryDTO {
  id: number;
  name: string;
  description?: string;
  iconUrl?: string;
}

export interface TagDTO {
  id: number;
  name: string;
}

export interface FlavorDTO {
  id: number;
  name: string;
}

export interface ProductImageDTO {
  id: number;
  url: string;
  isMain: boolean;
  sortOrder: number;
}

export enum OrderStatus {
  InStock = 0,
  OutOfStock = 1,
  PreOrder = 2,
}

export interface ProductDTO {
  id: number;
  name: string;
  description?: string;
  status: OrderStatus;
  price: number;
  stockQuantity: number;
  likeCount: number;
  brand?: BrandDTO;
  category?: CategoryDTO;
  tags: TagDTO[];
  images: ProductImageDTO[];
}

export interface LiquidDTO extends ProductDTO {
  volume: number;
  nicotine: number;
  iceLevel: number;
  flavors: FlavorDTO[];
}

export interface VapeDTO extends ProductDTO {
  batteryCapacity: number;
  maxPower: number;
  color: string;
  tankCapacity: number;
  coilResistance: number;
}

export interface ConsumableDTO extends ProductDTO {
}

export type ProductUnion = LiquidDTO | VapeDTO | ConsumableDTO;

export function isLiquid(product: ProductUnion): product is LiquidDTO {
  return 'volume' in product && 'nicotine' in product;
}

export function isVape(product: ProductUnion): product is VapeDTO {
  return 'batteryCapacity' in product && 'maxPower' in product;
}

export function isConsumable(product: ProductUnion): product is ConsumableDTO {
  return !isLiquid(product) && !isVape(product);
}
