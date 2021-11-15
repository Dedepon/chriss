import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, take } from 'rxjs/operators';
import { SNACK_BAR_CONFIG_ERROR, SNACK_BAR_CONFIG_SUCCESS } from 'src/app/constants';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  constructor(
    private personService: PersonService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      address: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      message: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.personService.getPerson().subscribe(
      (p: Person) => {
        this.loading = false;
        if (p) {
          this.form.patchValue(p);
        }
      },
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          'Une erreur est survenue lors de la récupération des données : ' +
            e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  public save(): void {
    this.loading = true;
    this.personService.updateAddress(this.form.getRawValue()).subscribe(
      () =>
        this.confirmAndStopLoading(
          'Les données sont sauvegardées avec succès.'
        ),
      (e: HttpErrorResponse) =>
        this.warnAndStopLoading(
          'Une erreur est survenue lors de la sauvegarde des données : ' + e &&
            e.error &&
            e.error.error
            ? e.error.error
            : e.toString()
        )
    );
  }

  private confirmAndStopLoading(confirmMessage: string): void {
    this.snackBar.open(confirmMessage, '', SNACK_BAR_CONFIG_SUCCESS);
    this.loading = false;
  }

  private warnAndStopLoading(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Ok', SNACK_BAR_CONFIG_ERROR);
    this.loading = false;
  }
}
