import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { AuthGuard } from "./auth-page/auth.guard";

const routes: Routes = [
  { path: "", component: AuthPageComponent, pathMatch: "full" },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin-page/admin.module").then((m) => m.AdminModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
