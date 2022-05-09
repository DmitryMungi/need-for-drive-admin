import { Component, Input } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.less"],
})
export class ProgressComponent {
  @Input() level: number = 0;

  constructor() {}
}
