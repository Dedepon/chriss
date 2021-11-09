import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";

export const API_URL: "/api/rest" = "/api/rest";
export const GLOBAL: {[key: string]: any} = {
    OUNI: new BehaviorSubject<boolean>(false),
    LOGGED_IN: false,
};

export const SNACK_BAR_CONFIG_SUCCESS: MatSnackBarConfig = {
    horizontalPosition: "end",
    verticalPosition: "bottom",
    panelClass: "success",
    duration: 5000
  };

  export const SNACK_BAR_CONFIG_ERROR: MatSnackBarConfig = {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: "error"
    };