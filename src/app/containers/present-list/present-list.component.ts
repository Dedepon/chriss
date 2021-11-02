import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PresentFormComponent } from 'src/app/components/present-form/present-form.component';
import { GLOBAL } from 'src/app/constants';
import { Present } from 'src/app/models/present';
import { Shop } from 'src/app/models/shop';
import { PresentService } from 'src/app/services/present/present.service';
import { ShopService } from 'src/app/services/shop/shop.service';

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
  public shopList: Shop[] = [];
  public editedPresent: Present;
  public selectedPresent: Present;
  public listLoading: boolean = false;
  public actionLoading: boolean = false;
  public ouni: BehaviorSubject<boolean> = GLOBAL.OUNI;

  private dialogRef: MatDialogRef<PresentFormComponent>;

  constructor(
    private presentService: PresentService,
    private shopService: ShopService,
    readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reloadList();
    this.shopService.getShopList().subscribe((data: Shop[]) => this.shopList = data);
  }

  public openPresentDialog(present?: Present): void {
    this.editedPresent = present || new Present();
    this.dialogRef = this.dialog.open(this.presentFormDialog, {
      width: "600px"
    });
  }

  public savePresent(present: Present): void {
    this.actionLoading = true;
    if (present._id) {
      this.presentService.updatePresent(present).subscribe(() => {
        this.actionLoading = false;
        this.reloadList();
      },
      () => this.actionLoading = false);
    } else {
      this.presentService.createPresent(present).subscribe(() => {
        this.actionLoading = false;
        this.reloadList();
      },
      () => this.actionLoading = false);
    }
  }

  public deletePresent(present: Present): void {
    if (present._id) {
      this.actionLoading = true;
      this.presentService.deletePresent(present).subscribe(() => {
        this.actionLoading = false;
        this.reloadList();
      },
      () => this.actionLoading = false);
    }
  }

  public reloadList(): void {
    debugger;
    this.listLoading = true;
    this.dialogRef && this.dialogRef.close();
    this.presentService.loadPresents().subscribe((data: Present[]) => {
      this.presentList = data;
      this.listLoading = false;
    },
    () => this.listLoading = false);
  }

  public openDetails(present: Present): void {
    if (present) {
      this.selectedPresent = present;
      this.dialog.open(this.presentDetailsDialog);
    }
  }
}
