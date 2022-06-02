import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-button-close",
  templateUrl: "./button-close.component.html",
  styleUrls: ["./button-close.component.less"],
})
export class ButtonCloseComponent {
  @Output() onClick = new EventEmitter<void>();

  constructor() {}
}
