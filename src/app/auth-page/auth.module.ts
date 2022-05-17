import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdminModule } from "../admin-page/admin.module";
import { LogoModule } from "../shared/components/logo/logo.module";
import { AppInterceptor } from "../app.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthPageComponent } from "./auth-page.component";

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    FormsModule,
    LogoModule,
    HttpClientModule,
    AdminModule,
    RouterModule,
    BrowserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  exports: [AuthPageComponent],
})
export class AuthModule {}
