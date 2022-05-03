import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { IAuth } from "./auth.interface";
import { AuthService } from "./auth.service";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.less"],
})
export class AuthPageComponent implements OnInit {
  public userMail: string = "";
  public password: string = "";
  public error = this.authService.error;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  private checkAuth() {
    if (this.authService.isAuthenticated()) {
      this.navigateToAccount();
    }
  }

  private navigateToAccount() {
    this.router.navigate(["/admin"]);
  }

  onSubmit() {
    const authData: IAuth = {
      username: this.userMail,
      password: this.password,
    };

    this.authService
      .login(authData)
      .pipe(tap(() => this.navigateToAccount()))
      .subscribe();
  }
}
