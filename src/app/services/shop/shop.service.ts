import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Shop } from "src/app/models/shop";
import { SHOP_LIST_URL } from "./constants";

@Injectable({
  providedIn: "root"
})
export class ShopService {
  constructor(private http: HttpClient) {
  }

  public getShopList(): Observable<Shop[]> {
    return this.http.get<Shop[]>(SHOP_LIST_URL);
  }

  public createShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(SHOP_LIST_URL, shop);
  }

  public updateShop(shop: Shop): Observable<Shop> {
    return this.http.put<Shop>(SHOP_LIST_URL + "/" + shop._id, shop);
  }

  public deleteShop(shop: Shop): Observable<Shop> {
    return this.http.delete<Shop>(SHOP_LIST_URL + "/" + shop._id);
  }
}