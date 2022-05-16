import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.less"],
})
export class TextareaComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Output() changeValue = new EventEmitter<string>();
  @ViewChild("textarea") textarea!: ElementRef;
  constructor() {}

  deleteValue() {
    this.textarea.nativeElement.value = "";
  }
}
