import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { APP_URL } from "../../const/const";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.less"],
})
export class LogoComponent implements OnChanges {
  @Input() size: "max" | "min" = "max";

  public url = APP_URL;
  public innerSize: "max" | "min" = "max";

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { size } = changes;

    if (size && size.currentValue) {
      this.innerSize = size.currentValue;
    }
  }
}
