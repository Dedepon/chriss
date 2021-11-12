import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Present } from 'src/app/models/present';

@Component({
  selector: 'app-present-form',
  templateUrl: './present-form.component.html',
  styleUrls: ['./present-form.component.scss'],
})
export class PresentFormComponent implements OnInit {
  @Input() public present: Present;
  @Input() public loading: boolean = false;

  @Output() public readonly savePresent: EventEmitter<Present> =
    new EventEmitter<Present>();

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(undefined, Validators.required),
      url: new FormControl(undefined, Validators.required),
      imageUrl: new FormControl(undefined, Validators.required),
      comment: new FormControl(),
      shop: new FormControl(undefined, Validators.required),
      price: new FormControl(undefined, Validators.required),
      quantity: new FormControl(),
      paymentMethod: new FormControl([], Validators.required),
    });
  }

  public ngOnInit(): void {
    this.form.patchValue(this.present);
  }

  public save(): void {
    this.savePresent.emit({
      ...this.present,
      ...this.form.getRawValue(),
    });
  }
}
