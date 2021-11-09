import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PresentOrder } from "src/app/models/present-order";
import { PRESENT_ORDER_LIST_URL } from "./constants";

@Injectable({
  providedIn: "root"
})
export class PresentOrderService {
  constructor(private http: HttpClient) {
  }

  public loadPresentOrders(): Observable<PresentOrder[]> {
    return this.http.get<PresentOrder[]>(PRESENT_ORDER_LIST_URL);
  }

  public createPresentOrder(presentOrder: Partial<PresentOrder>): Observable<PresentOrder> {
    return this.http.post<PresentOrder>(PRESENT_ORDER_LIST_URL, presentOrder);
  }

  public updatePresentOrder(presentOrder: Partial<PresentOrder>): Observable<PresentOrder> {
    return this.http.put<PresentOrder>(PRESENT_ORDER_LIST_URL + "/" + presentOrder._id, presentOrder);
  }

  public deletePresentOrder(presentOrder: Partial<PresentOrder>): Observable<PresentOrder> {
    return this.http.delete<PresentOrder>(PRESENT_ORDER_LIST_URL + "/" + presentOrder._id);
  }
}