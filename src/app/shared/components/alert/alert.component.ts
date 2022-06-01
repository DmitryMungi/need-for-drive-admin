import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { AlertService } from "./alert.service";

export type AlertStatus = "success" | "error";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.less"],
})
export class AlertComponent implements OnChanges {
  public get text(): string {
    return this.alertService.alertText;
  }

  public get status(): AlertStatus {
    return this.alertService.alertStatus;
  }

  public get isAlert(): boolean {
    return this.alertService.isAlert;
  }

  public innerStatus: AlertStatus = "success";
  constructor(private alertService: AlertService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { status } = changes;

    if (status && status.currentValue) {
      this.innerStatus = status.currentValue;
    }
  }

  onClose() {
    this.alertService.destroyAlert();
  }
}
