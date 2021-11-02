import { BehaviorSubject } from "rxjs";

export const API_URL: "/api/rest" = "/api/rest";
export const GLOBAL: {[key: string]: any} = {
    OUNI: new BehaviorSubject<boolean>(false)
};