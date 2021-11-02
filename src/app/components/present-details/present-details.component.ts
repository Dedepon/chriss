import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Present } from 'src/app/models/present';
import { PresentOrder } from 'src/app/models/present-order';

@Component({
  selector: 'app-present-details',
  templateUrl: './present-details.component.html',
  styleUrls: ['./present-details.component.scss']
})
export class PresentDetailsComponent implements OnInit {

  @Input() public present: Present;
  @Output() public readonly saveOrder: EventEmitter<PresentOrder> = new EventEmitter<PresentOrder>();

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      present: new FormControl(undefined, Validators.required),
      quantity: new FormControl(1, Validators.required),
      payment: new FormControl("payment", Validators.required)
    });
  }

  ngOnInit(): void {
    this.form.get("present")?.patchValue(this.present);
  }

  public save(): void {
    const quantityControl: PresentOrder = this.form.getRawValue();
    if (quantityControl.quantity) {
    this.saveOrder.next({
      ...quantityControl,
      totalPrice: quantityControl.quantity * this.present.price
    })
  }
  }
}
