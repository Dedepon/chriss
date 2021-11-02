import { Shop } from "./shop";

export class Present {
    public _id: string;
    public name: string;
    public url: string;
    public imageUrl: string;
    public comment: string;
    public shop: Shop;
    public price: number;
    public quantity: number;
    public ordered: number;
    public status: "complete" | "ongoing";
}