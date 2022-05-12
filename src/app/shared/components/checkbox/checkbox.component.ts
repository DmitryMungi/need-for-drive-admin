import { Component, Input, Output, EventEmitter } from "@angular/core";

export interface IChek {
  name: string;
  isActive: boolean;
}

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.less"],
})
export class CheckboxComponent {
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() isChecked: boolean = false;
  @Output() toggleCheckBox = new EventEmitter<IChek>();

  constructor() {}

  toggle(value: string) {
    this.isChecked = !this.isChecked;
    const item = {
      name: value,
      isActive: this.isChecked,
    };
    this.toggleCheckBox.emit(item);
  }
}
