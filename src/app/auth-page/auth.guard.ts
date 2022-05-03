import { CanLoad, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    const isAuth = this.authService.isAuthenticated();

    if (isAuth) {
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}
