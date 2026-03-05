import type { Product } from "./BaseBroduct";
export const components: Product[] = [
    {
        id: 1,
        name: "Strawberry Delight",
        description: "A sweet and fruity vape liquid with a rich strawberry flavor.",
        price: 19.99,
        image: "https://www.vapesuperstore.ca/cdn/shop/files/strawberry-yojo-salt-by-maverick-e-liquid-30ml-12mg-vape-superstore-saskatchewan-canada-1212569937.png?v=1766356734&width=900",
        rating: 4.5,
        category: "liquid",
        volume: 10,
        flavor: "sweet",
        nicotine: 6
    },
    {
        id: 2,
        name: "Blue Raspberry",
        description: "A refreshing blend of blueberry and raspberry flavors.",
        price: 19.99,
        image: "https://example.com/images/blue-raspberry.jpg",
        rating: 4.2,
        category: "liquid",
        volume: 30,
        flavor: "sour",
        nicotine: 12
    },
    {
        id: 3,
        name: "Classic Tobacco",
        description: "A smooth and rich tobacco flavor for traditional vape enthusiasts.",
        price: 19.99,
        image: "https://img.vawoo.com/images/thumbnails/340/370/detailed/337/ezgif-4-5d723ce89e.jpg",
        rating: 4.0,
        category: "liquid",
        volume: 50,
        flavor: "tobacco",
        nicotine: 18
    },
    {
        id: 4,
        name : "Vape Pro 3000",
        description: "A high-performance vape device with adjustable wattage and long battery life.",
        price: 49.99,
        image: "https://example.com/images/vape-pro-3000.jpg",
        rating: 4.8,
        category: "vape",
        color: "black",
        material: "metal",
        batteryLife: 2400,
        wattageRange: "5-80W"
    },
    {
        id: 5,
        name : "Vape Mini",
        description: "A compact and stylish vape device perfect for on-the-go vaping.",
        price: 29.99,
        image: "https://example.com/images/vape-mini.jpg",
        rating: 4.3,
        category: "vape",
        color: "red",
        material: "plastic",
        batteryLife: 1500,
        wattageRange: "5-40W"
    },
    {
        id: 6,
        name : "Vape Max",
        description: "A powerful vape device with a large battery and advanced features for experienced vapers.",
        price: 69.99,
        image: "https://example.com/images/vape-max.jpg",
        rating: 4.7,
        category: "vape",
        color: "silver",
        material: "metal",
        batteryLife: 3000,
        wattageRange: "10-100W"
    },
];
export default components;