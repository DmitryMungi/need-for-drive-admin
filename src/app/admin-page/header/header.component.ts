import { Component, ElementRef, ViewChild, Renderer2 } from "@angular/core";
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private render: Renderer2
  ) {}

  @ViewChild("details")
  private details!: ElementRef;

  openDetails() {
    this.details.nativeElement.classList.contains("active")
      ? this.render.removeClass(this.details.nativeElement, "active")
      : this.render.addClass(this.details.nativeElement, "active");
  }

  logOut() {
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
