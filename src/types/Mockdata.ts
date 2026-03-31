export interface IProductProps{
    id: string;
    name: string;
    price: number;
    img : string;
    brand? : string;
    description? : string;  
    InStock : boolean;
    IsLiked? : boolean;
    InFavorite? : boolean;
}
export interface ILiquid extends IProductProps{
    type : 'liquid';
    volume: 10 | 30 | 50 | 100;
    flavor : string[];
    nicotine : number;
    Icelevel : 0 | 25 | 50 | 75 | 100;
}
export interface IVape extends IProductProps{
    type : 'vape'
    batteryCapacity: number;    
    maxPower: number;          
    color: string;
    TankCapacity : number;
    CoilResistence : number;
}
export interface IConsumables extends IProductProps{
    type : 'consumables'
}
export  type Product = ILiquid | IVape | IConsumables;