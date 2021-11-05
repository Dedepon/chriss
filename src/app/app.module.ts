import { NgModule } from '@angular/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { PresentListComponent } from './containers/present-list/present-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresentService } from './services/present/present.service';
import { ShopService } from './services/shop/shop.service';
import { PresentFormComponent } from './components/present-form/present-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PresentDetailsComponent } from './components/present-details/present-details.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
    data: { title: 'Liste de naissance' },
  },
  {
    path: 'presents',
    component: PresentListComponent,
    data: { title: 'Liste de naissance' },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PresentListComponent,
    PresentFormComponent,
    HomepageComponent,
    PresentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatDividerModule
  ],
  providers: [PresentService, ShopService],
  bootstrap: [AppComponent],
})
export class AppModule {}
