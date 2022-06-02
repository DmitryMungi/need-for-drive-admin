import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth-page/auth.module";
import { ProgressModule } from "./shared/components/progress/progress.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, ProgressModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
