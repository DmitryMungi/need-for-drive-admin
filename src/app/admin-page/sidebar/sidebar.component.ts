import { Component } from "@angular/core";
import { IMenuItem, MENU_ITEMS } from "./sidebar.const";

@Component({
  selector: "app-side-bar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.less"],
})
export class SideBarComponent {
  constructor() {}

  public menuItems: IMenuItem[] = MENU_ITEMS;
}
