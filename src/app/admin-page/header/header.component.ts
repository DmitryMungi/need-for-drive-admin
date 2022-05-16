import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { tap } from "rxjs";
import { AuthService } from "src/app/auth-page/auth.service";
import { AlertStatus } from "src/app/shared/components/alert/alert.component";
import { TokenService } from "../../shared/services/token.service";
import { AlertService } from "src/app/shared/components/alert/alert.service";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
  @ViewChild("details", { static: false }) details!: ElementRef;

  public get isAlert() {
    return this.alertService.isAlert;
  }
  public get alertText() {
    return this.alertService.alertText;
  }
  public get alertStatus(): AlertStatus {
    return this.alertService.alertStatus;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {}

  openDetails() {
    this.details.nativeElement.classList.toggle("active");
  }

  inOut() {
    this.authService
      .logout()
      .pipe(
        tap(() => {
          this.router.navigate([""]), this.tokenService.setToken(null);
        })
      )
      .subscribe();
  }
}
