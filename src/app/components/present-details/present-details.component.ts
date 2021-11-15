import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Present } from 'src/app/models/present';
import { PresentOrder } from 'src/app/models/present-order';

@Component({
  selector: 'app-present-details',
  templateUrl: './present-details.component.html',
  styleUrls: ['./present-details.component.scss'],
})
export class PresentDetailsComponent implements OnInit {
  @Input() public present: Present;

  @Input() public loading = false;

  @Output() public readonly saveOrder: EventEmitter<Partial<PresentOrder>> =
    new EventEmitter<Partial<PresentOrder>>();

  public paymentType: 'directOrder' | 'payment';

  public quantity: number = 1;

  constructor() {}

  public ngOnInit(): void {
    if (this.present.paymentMethod.length === 1) {
      this.paymentType = this.present.paymentMethod[0];
    }
  }

  public save(): void {
    this.saveOrder.next({
      present: this.present,
      quantity: this.quantity,
      totalPrice: this.quantity * this.present.price,
      payment: this.paymentType,
    });
  }
}
