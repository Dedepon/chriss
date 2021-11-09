import { PresentOrder } from "./present-order";

export class Order {
    public _id: string;
    public person: string;
    public status: "open" | "close";
    public presents: PresentOrder[];
    public date?: string;
    public totalPriceToPay?: number;
    public totalPrice?: number;
}