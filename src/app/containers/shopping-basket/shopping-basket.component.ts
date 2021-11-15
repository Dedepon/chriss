import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  SNACK_BAR_CONFIG_ERROR,
  SNACK_BAR_CONFIG_SUCCESS,
} from 'src/app/constants';
import { Order } from 'src/app/models/order';
import { PresentOrder } from 'src/app/models/present-order';
import { OrderService } from 'src/app/services/order/order.service';
import { PresentOrderService } from 'src/app/services/present-order/present-order.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss'],
})
export class ShoppingBasketComponent implements OnInit {
  public loading = false;
  public order: Order | undefined;
  public oldOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private presentOrderService: PresentOrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();

    this.orderService.orders$.subscribe((orders: Order[]) => {
      delete this.order;
      this.oldOrders = [];
      orders.forEach((o: Order) => {
        if (o.status === 'open') {
          this.order = o;
        } else {
          this.oldOrders.push(o);
        }
      });
    });
  }

  public deleteItem(po: PresentOrder): void {
    this.loading = true;
    this.presentOrderService.deletePresentOrder(po).subscribe(
      () => this.confirmAndReload('Panier modifié avec succès.'),
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          'Une erreur est survenue lors de la modification du panier : ' + e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  public upatePresentOrder(po: PresentOrder): void {
    if (po.quantity === 0) {
      this.deleteItem(po);
      return;
    }
    po.totalPrice = po.quantity * po.present.price;
    this.loading = true;
    this.presentOrderService.updatePresentOrder(po).subscribe(
      () => this.confirmAndReload('Panier modifié avec succès.'),
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          'Une erreur est survenue lors de la modification du panier : ' + e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  public getTotal(method: 'directOrder' | 'payment'): number {
    return this.order
      ? this.order.presents.reduce<number>(
          (total, presentOrder: PresentOrder) => {
            return presentOrder.payment === method
              ? total + presentOrder.totalPrice
              : total;
          },
          0
        )
      : 0;
  }

  public confirmOrder(): void {
    if (this.order) {
      this.loading = true;
      this.orderService.closeOrder(this.order).subscribe(
        () =>
          this.confirmAndReload('Panier confirmé ! Merci pour les cadeaux !', true),
        (e: HttpErrorResponse) =>
          this.warnAndStopLoading(
            'Une erreur est survenue lors de la confirmation du panier : ' +
              e &&
              e.error &&
              e.error.error
              ? e.error.error
              : e.toString()
          )
      );
    }
  }

  private loadOrders(): void {
    this.loading = true;
    this.orderService.loadOrders().subscribe(
      () => (this.loading = false),
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          'Une erreur est survenue lors de la récupération du panier : ' + e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  private confirmAndReload(confirmMessage: string, redirectToProfile: boolean = false): void {
    this.snackBar.open(confirmMessage, '', SNACK_BAR_CONFIG_SUCCESS);
    this.loadOrders();
    if (redirectToProfile) {
      this.router.navigate(["/profile"]);
    }
  }

  private warnAndStopLoading(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Ok', SNACK_BAR_CONFIG_ERROR);
    this.loading = false;
  }
}
