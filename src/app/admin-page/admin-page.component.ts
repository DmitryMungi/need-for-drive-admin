import { Component } from "@angular/core";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.less"],
})
export class AdminPageComponent {
  public menuIsOpen: boolean = false;

  constructor() {}

  onMenuBtn() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
