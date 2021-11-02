import { Present } from "./present";

export class PresentOrder {
    public _id: string;
    public present: Present;
    public quantity: number;
    public totalPrice: number;
    public payment: "directOrder" | "payment";
}