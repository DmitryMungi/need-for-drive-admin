import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.less"],
})
export class AdminPageComponent implements OnInit {
  public menuIsOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onMenuBtn() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
