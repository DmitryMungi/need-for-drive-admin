import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-car-view",
  templateUrl: "./car-view.component.html",
  styleUrls: ["./car-view.component.less"],
})
export class CarViewComponent {
  @ViewChild("imgModel", { static: false }) imgModel?: ElementRef;
  public pLevel: number = 40;
  constructor() {}

  getImage(value: File) {
    if (this.imgModel != undefined)
      this.imgModel.nativeElement.src = URL.createObjectURL(value);
  }
}
