import { Injectable } from "@angular/core";
import { AlertStatus } from "./alert.component";
import { SUCCESS } from "../../const/const";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  public isAlert = false;
  public alertText = "";
  public alertStatus: AlertStatus = SUCCESS;

  showAlert(text: string, status: AlertStatus) {
    this.alertText = text;
    this.alertStatus = status;
    this.isAlert = true;

    setTimeout(() => {
      this.destroyAlert();
    }, 2000);
  }

  destroyAlert() {
    this.isAlert = false;
    this.alertText = "";
  }
}
