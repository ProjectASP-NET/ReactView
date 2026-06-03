import { ProductDTO, LiquidDTO, VapeDTO, ConsumableDTO, ProductUnion, OrderStatus, isLiquid, isVape } from "@/types/product.types";
import { Product, ILiquid, IVape, IConsumables } from "@/types/product.types";

export class ProductAdapter {
  static getPrimaryImage(images: { url: string; isMain: boolean }[]): string {
    if (!images || images.length === 0) {
      return "/placeholder.jpg";
    }
    const primary = images.find(img => img.isMain);
    const imageUrl = primary?.url || images[0]?.url || "/placeholder.jpg";

    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
      return "/placeholder.jpg";
    }

    return imageUrl;
  }

  static isInStock(product: ProductDTO): boolean {
    return product.status === OrderStatus.InStock && product.stockQuantity > 0;
  }

  static toMockFormat(dto: ProductUnion): Product {
    const base = {
      id: dto.id.toString(),
      name: dto.name,
      price: dto.price,
      img: this.getPrimaryImage(dto.images),
      brand: dto.brand?.name,
      brandId: dto.brand?.id,
      description: dto.description,
      InStock: this.isInStock(dto),
      LikeCount: dto.likeCount,
    };

    if (isLiquid(dto)) {
      return {
        ...base,
        type: 'liquid' as const,
        volume: dto.volume as 10 | 30 | 50 | 100,
        flavor: dto.flavors.map(f => f.name),
        nicotine: dto.nicotine,
        Icelevel: dto.iceLevel as 0 | 25 | 50 | 75 | 100,
      } as ILiquid;
    }

    if (isVape(dto)) {
      return {
        ...base,
        type: 'vape' as const,
        batteryCapacity: dto.batteryCapacity,
        maxPower: dto.maxPower,
        color: dto.color,
        TankCapacity: dto.tankCapacity,
        CoilResistence: dto.coilResistance,
      } as IVape;
    }

    return {
      ...base,
      type: 'consumables' as const,
    } as IConsumables;
  }

  static toMockFormatArray(dtos: ProductUnion[]): Product[] {
    return (dtos ?? []).map(dto => this.toMockFormat(dto));
  }

  static getProductType(dto: ProductUnion): 'liquid' | 'vape' | 'consumables' {
    if (isLiquid(dto)) return 'liquid';
    if (isVape(dto)) return 'vape';
    return 'consumables';
  }

  static getAllImages(dto: ProductDTO): string[] {
    return dto.images.map(img => img.url);
  }

  static getFlavorNames(dto: LiquidDTO): string[] {
    return dto.flavors.map(f => f.name);
  }

  static getTagNames(dto: ProductDTO): string[] {
    return dto.tags.map(t => t.name);
  }
}
