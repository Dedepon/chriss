import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PresentFormComponent } from 'src/app/components/present-form/present-form.component';
import {
  GLOBAL,
  SNACK_BAR_CONFIG_ERROR,
  SNACK_BAR_CONFIG_SUCCESS,
} from 'src/app/constants';
import { Present } from 'src/app/models/present';
import { PresentOrder } from 'src/app/models/present-order';
import { PresentOrderService } from 'src/app/services/present-order/present-order.service';
import { PresentService } from 'src/app/services/present/present.service';

@Component({
  selector: 'app-present-list',
  templateUrl: './present-list.component.html',
  styleUrls: ['./present-list.component.scss'],
})
export class PresentListComponent implements OnInit {
  @ViewChild('presentFormDialog')
  presentFormDialog: TemplateRef<PresentFormComponent>;
  @ViewChild('presentDetailsDialog')
  presentDetailsDialog: TemplateRef<PresentFormComponent>;

  public presentList: Present[] = [];
  public editedPresent: Present;
  public selectedPresent: Present;
  public listLoading: boolean = false;
  public actionLoading: boolean = false;
  public ouni: Observable<boolean> = GLOBAL.OUNI.asObservable();

  private dialogRef: MatDialogRef<any>;

  constructor(
    private presentService: PresentService,
    private presentOrderService: PresentOrderService,
    readonly dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reloadList();
  }

  public openPresentDialog(present?: Present): void {
    this.editedPresent = present || new Present();
    this.dialogRef = this.dialog.open(this.presentFormDialog, {
      width: '600px',
      disableClose: true
    });
  }

  public savePresent(present: Present): void {
    this.actionLoading = true;
    if (present._id) {
      this.presentService.updatePresent(present).subscribe(
        () => this.confirmAndReload('Cadeau modifié avec succès'),
        (e: HttpErrorResponse) =>
          this.warnAndStopLoading(
            'Une erreur est survenue lors de la modification du cadeau : ' +
              e &&
              e.error &&
              e.error.error
              ? e.error.error
              : e.toString()
          )
      );
    } else {
      this.presentService.createPresent(present).subscribe(
        () => this.confirmAndReload('Cadeau créé avec succès.'),
        (e: HttpErrorResponse) =>
          this.warnAndStopLoading(
            'Une erreur est survenue lors de la création du cadeau : ' + e &&
              e.error &&
              e.error.error
              ? e.error.error
              : e.toString()
          )
      );
    }
  }

  public deletePresent(present: Present): void {
    if (present._id) {
      this.actionLoading = true;
      this.presentService.deletePresent(present).subscribe(
        () => this.confirmAndReload('Cadeau supprimé avec succès.'),
        (e: HttpErrorResponse) =>
          this.warnAndStopLoading(
            'Une erreur est survenue lors de la suppression du cadeau : ' + e &&
              e.error &&
              e.error.error
              ? e.error.error
              : e.toString()
          )
      );
    }
  }

  public reloadList(): void {
    this.listLoading = true;
    this.dialogRef && this.dialogRef.close();
    this.presentService.loadPresents().subscribe(
      (data: Present[]) => {
        this.presentList = data;
        this.listLoading = false;
      },
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          'Une erreur est survenue lors du chargement des cadeaux : ' + e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  public openDetails(present: Present): void {
    if (present) {
      this.selectedPresent = present;
      this.dialogRef = this.dialog.open(this.presentDetailsDialog, {
        width: '75%',
      });
    }
  }

  public savePresentOrder(presentOrder: Partial<PresentOrder>): void {
    this.actionLoading = true;
    this.presentOrderService.createPresentOrder(presentOrder).subscribe(
      () => this.confirmAndReload('Cadeau ajouté au panier'),
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          "Une erreur est survenue lors de l'ajout du cadeau dans le panier : " +
            e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  private warnAndStopLoading(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Ok', SNACK_BAR_CONFIG_ERROR);
    this.listLoading = false;
    this.actionLoading = false;
  }

  private confirmAndReload(confirmMessage: string): void {
    this.snackBar.open(confirmMessage, '', SNACK_BAR_CONFIG_SUCCESS);
    this.actionLoading = false;
    this.reloadList();
  }
}
