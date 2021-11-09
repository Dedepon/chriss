import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { PersonService } from '../../services/person/person.service';

import * as shajs from 'sha.js';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/models/order';
import {
  GLOBAL,
  SNACK_BAR_CONFIG_ERROR,
  SNACK_BAR_CONFIG_SUCCESS,
} from 'src/app/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public userId: string;
  public loading = false;
  public authentification: 'register' | 'login' = 'login';
  public password: string;
  public passwordConfirmation: string;

  constructor(
    private orderService: OrderService,
    private personService: PersonService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public onLogin(): void {
    if (this.userId && this.password) {
      this.loading = true;
      this.personService
        .login(this.userId, shajs('sha256').update(this.password).digest('hex'))
        .subscribe(
          () => this.confirmAndGetOrders("Authentification réussie."),
          (e: HttpErrorResponse) =>
            this.warnAndStopLoading(
              "Une erreur est survenue lors de l'authentification : " + e &&
                e.error &&
                e.error.error
                ? e.error.error
                : e.toString()
            )
        );
    }
  }

  public onRegister(): void {
    if (
      this.userId &&
      this.password &&
      this.passwordConfirmation &&
      this.passwordConfirmation === this.password
    ) {
      this.loading = true;
      this.personService
        .register(
          this.userId,
          shajs('sha256').update(this.password).digest('hex')
        )
        .subscribe(
          () => this.confirmAndGetOrders("Authentification réussie."),
          (e: HttpErrorResponse) =>
            this.warnAndStopLoading(
              "Une erreur est survenue lors de l'enregistrement : " + e &&
                e.error &&
                e.error.error
                ? e.error.error
                : e.toString()
            )
        );
    }
  }

  public openLogin(templateRef: TemplateRef<any>): void {
    this.dialog
      .open(templateRef)
      .afterClosed()
      .subscribe(() => this.resetForm());
  }

  public openRegister(templateRef: TemplateRef<any>): void {
    this.dialog
      .open(templateRef)
      .afterClosed()
      .subscribe(() => this.resetForm());
  }

  public getOrders(): void {
    this.orderService.loadOrders().subscribe(
      (orders: Order[]) => {
        if (
          orders &&
          orders.length !== 0 &&
          orders.findIndex((o: Order) => o.status === 'open') !== -1
        ) {
          return this.goToPresentList();
        }
        this.orderService.createOrder(new Order()).subscribe(
          () => this.goToPresentList(),
          (e: HttpErrorResponse) =>
            this.warnAndStopLoading(
              "Une erreur est survenue lors de la création d'un nouveau panier : " +
                e &&
                e.error &&
                e.error.error
                ? e.error.error
                : e.toString()
            )
        );
      },
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

  public isLoggedIn(): boolean {
    return GLOBAL.LOGGED_IN;
  }

  private resetForm(): void {
    this.userId = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  private goToPresentList(): void {
    this.loading = false;
    this.dialog.closeAll();
    this.router.navigate(['/presents']);
  }

  private confirmAndGetOrders(confirmMessage: string): void {
    this.snackBar.open(confirmMessage, '', SNACK_BAR_CONFIG_SUCCESS);
    this.loading = false;
    this.getOrders();
  }
  private warnAndStopLoading(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Ok', SNACK_BAR_CONFIG_ERROR);
    this.loading = false;
  }
}
