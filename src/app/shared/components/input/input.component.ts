import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

export const TYPE_DEF = "text";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.less"],
})
export class InputComponent {
  @ViewChild("input") input!: ElementRef;
  @Input() name: string = "";
  @Input() label: string = "";
  @Input() type: string = TYPE_DEF;
  @Input() placeholder: string = "";
  @Input() step?: string;
  @Input() min: number = 0;
  @Input() max?: number;
  @Input() value: string = "";

  @Output() changeValue = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  constructor() {}

  onFocus() {
    this.focus.emit();
  }

  onBlur() {
    this.blur.emit();
  }

  onDeleteValue() {
    this.input.nativeElement.value = "";
  }

  onChange(value: string) {
    this.changeValue.emit(value);
  }
}
