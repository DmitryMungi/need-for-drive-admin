import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

export const ITEMS = ["пункт1", "пункт2", "пункт3", "пункт4"];

@Component({
  selector: "app-input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.less"],
})
export class InputSelectComponent implements OnInit {
  @ViewChild("select") select!: ElementRef;
  @Input() items: string[] = ITEMS;
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Output() changeValue = new EventEmitter<string>();
  public isOpen = false;
  public value: string = "";

  constructor() {}

  ngOnInit(): void {}

  valueIsCange(value: string) {
    console.log(value);
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
