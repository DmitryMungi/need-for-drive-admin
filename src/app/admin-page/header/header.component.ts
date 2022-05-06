import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { tap } from "rxjs";
import { AuthService } from "src/app/auth-page/auth.service";
import { TokenService } from "../../shared/services/token.service";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
  @ViewChild("details", { static: false }) details!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
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
