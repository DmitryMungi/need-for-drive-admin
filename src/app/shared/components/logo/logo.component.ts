import { Component } from "@angular/core";
import { APP_URL } from "../../const/const";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.less"],
})
export class LogoComponent {
  public url = APP_URL;

  constructor() {}
}
