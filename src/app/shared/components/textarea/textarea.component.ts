import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.less"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() value: string = "";
  @Output() changeValue = new EventEmitter<string>();

  private subscription!: Subscription;
  textAreaControl = new FormControl("", [Validators.required]);
  onChange(_: string) {}
  onTouched(_: any) {}
  constructor() {}

  ngOnInit(): void {
    this.subscription = this.textAreaControl.valueChanges.subscribe((val) => {
      if (this.onChange) {
        this.onChange(val);
      }
    });
  }

  deleteValue() {
    this.writeValue("");
  }

  writeValue(value: string): void {
    this.value = value;
    this.textAreaControl.setValue(value);
    this.changeValue.emit(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
