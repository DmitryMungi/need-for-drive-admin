import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.less"],
})
export class DropdownComponent {
  @Input() items: string[] = [];
  @Input() isOpen = false;
  @Output() changeValue = new EventEmitter<string>();

  constructor() {}

  choiseValue(value: string) {
    this.changeValue.emit(value);
  }
}
