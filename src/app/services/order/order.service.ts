import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { ORDER_LIST_URL } from './constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public orders$: Observable<Order[]>;

  private ordersSubject$: BehaviorSubject<Order[]> = new BehaviorSubject<
    Order[]
  >([]);
  constructor(private http: HttpClient) {
    this.orders$ = this.ordersSubject$.asObservable();
  }

  public loadOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDER_LIST_URL).pipe(
      map(
        (orders: Order[]) =>
          orders.map((o: Order) => {
            o.date = o.date ? new Date(o.date).toLocaleString() : '';
            return o;
          }),
        tap((orders: Order[]) => this.ordersSubject$.next(orders))
      )
    );
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(ORDER_LIST_URL, order);
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(ORDER_LIST_URL + '/' + order._id, order);
  }

  public closeOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      ORDER_LIST_URL + '/' + order._id + '/close',
      {}
    );
  }

  public deleteOrder(order: Order): Observable<Order> {
    return this.http.delete<Order>(ORDER_LIST_URL + '/' + order._id);
  }
}
