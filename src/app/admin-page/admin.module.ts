import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminPageComponent } from "./admin-page.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { LogoModule } from "../shared/components/logo/logo.module";
import { CarCardComponent } from './pages/car-card/car-card.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { OrdersComponent } from './pages/orders/orders.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    CarCardComponent,
    CarListComponent,
    OrdersComponent,
  ],
  imports: [AdminRoutingModule, RouterModule, LogoModule],
  exports: [AdminPageComponent],
})
export class AdminModule {}
