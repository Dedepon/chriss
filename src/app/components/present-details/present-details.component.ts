import {
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { Present } from "src/app/models/present";
import { PresentOrder } from "src/app/models/present-order";

@Component({
  selector: "app-present-details",
  templateUrl: "./present-details.component.html",
  styleUrls: ["./present-details.component.scss"]
})
export class PresentDetailsComponent {

  @Input() public present: Present;

  @Output() public readonly saveOrder: EventEmitter<Partial<PresentOrder>> = new EventEmitter<Partial<PresentOrder>>();

  public paymentType: "directOrder" | "payment" = "directOrder";

  public quantity: number = 1;

  constructor() {
  }

  public save(): void {
    this.saveOrder.next({
      present: this.present,
      quantity: this.quantity,
      totalPrice: this.quantity * this.present.price,
      payment: this.paymentType
    });
  }
}
