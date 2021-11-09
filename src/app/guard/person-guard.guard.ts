import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { GLOBAL } from "../constants";

@Injectable({
  providedIn: "root"
})
export class PersonGuardGuard implements CanActivate {
  public constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!GLOBAL.LOGGED_IN) {
        document.cookie = "userId=";
        const isCookieSet: boolean = document.cookie.indexOf("userId") === -1;
        document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        GLOBAL.LOGGED_IN = GLOBAL.LOGGED_IN || isCookieSet;
      }
    return (route.routeConfig && route.routeConfig.path === "home") ||  GLOBAL.LOGGED_IN || this.router.navigate(["/home"]);
  }
  
}
