import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPageComponent } from "./admin-page.component";
import { CarCardComponent } from "./pages/car-card/car-card.component";
import { CarListComponent } from "./pages/car-list/car-list.component";
import { OrdersComponent } from "./pages/orders/orders.component";

const routes: Routes = [
  {
    path: "",
    component: AdminPageComponent,
    children: [
      { path: "card", component: CarCardComponent },
      { path: "list", component: CarListComponent },
      { path: "orders", component: OrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
