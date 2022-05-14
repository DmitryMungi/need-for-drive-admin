import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.less"],
})
export class InputSelectComponent {
  @ViewChild("select") select!: ElementRef;
  @Input() items: string[] = [];
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Output() changeValue = new EventEmitter<string>();
  public isOpen = false;
  public value: string = "";

  constructor() {}

  valueIsCange(value: string) {
    // console.log(value);
  }

  selectOpen() {
    this.isOpen = true;
  }

  selectClose() {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }

  onItemClick(item: string) {
    this.value = item;
    this.changeValue.emit(this.value);
  }
}
