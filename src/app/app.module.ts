import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";

import { PresentListComponent } from "./containers/present-list/present-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PresentService } from "./services/present/present.service";
import { ShopService } from "./services/shop/shop.service";
import { PresentFormComponent } from "./components/present-form/present-form.component";
import { HomepageComponent } from "./containers/homepage/homepage.component";
import { PresentDetailsComponent } from "./components/present-details/present-details.component";
import { PersonGuardGuard } from "./guard/person-guard.guard";
import { ShoppingBasketComponent } from "./containers/shopping-basket/shopping-basket.component";
import { ProfileComponent } from "./containers/profile/profile.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const appRoutes: Routes = [
  {
    path: "home",
    component: HomepageComponent,
    data: { title: "Liste de naissance" },
    canActivate: [PersonGuardGuard]
  },
  {
    path: "presents",
    component: PresentListComponent,
    data: { title: "Liste de naissance" },
    canActivate: [PersonGuardGuard]
  },
  {
    path: "basket",
    component: ShoppingBasketComponent,
    data: { title: "Panier" },
    canActivate: [PersonGuardGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { title: "Coordonnées" },
    canActivate: [PersonGuardGuard]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PresentListComponent,
    PresentFormComponent,
    HomepageComponent,
    PresentDetailsComponent,
    ShoppingBasketComponent,
    ProfileComponent,
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
    MatDividerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  providers: [PresentService, ShopService],
  bootstrap: [AppComponent],
})
export class AppModule {}
