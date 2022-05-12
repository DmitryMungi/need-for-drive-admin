import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.less"],
})
export class TextareaComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Output() changeValue = new EventEmitter<string>();
  constructor() {}
}
