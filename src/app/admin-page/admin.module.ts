import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminPageComponent } from "./admin-page.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
  declarations: [AdminPageComponent],
  imports: [AdminRoutingModule, RouterModule],
  exports: [AdminPageComponent],
})
export class AdminModule {}
