export type BaseProduct ={
    id: number;
    name: string;
    description?: string;
    price: number;
    image: string;
    rating: number;
    category: string;
}
export type ComponentLiquid = BaseProduct & {
    category: 'liquid';
    volume: 10 | 30 | 50 | 100;
    flavor: 'sweet' | 'sour' | 'semi sweet' | 'tobacco';
    nicotine: 0 | 3 | 6 | 12 | 18;
}
export type ComponentVape = BaseProduct & {
    category: 'vape';
    color: string;
    material: 'plastic' | 'metal';
    batteryLife: number;
    wattageRange: string;
}
export type Product = ComponentLiquid | ComponentVape;