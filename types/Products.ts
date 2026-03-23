import { Product } from "./Mockdata";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    type: "vape",
    name: "XROS 3 Mini",
    brand: "Vaporesso",
    price: 1200,
    img: "/images/products/xros.png",
    description: "Vape",
    batteryCapacity: 1000,
    maxPower: 16,
    color: "Space Grey"
  },
  {
    id: "2",
    type: "liquid",
    name: "Husky Salt",
    brand: "Voodoo Lab",
    price: 450,
    img: "/images/products/husky.png",
    description: "IceLiquid",
    volume: 30,
    nicotine: 20,
    flavor: ["Ice", "WaterMelon"]
  },
];