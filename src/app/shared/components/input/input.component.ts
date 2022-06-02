import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

export const TYPE_DEF = "text";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.less"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @ViewChild("input") input!: ElementRef;
  @Input() name: string = "";
  @Input() label: string = "";
  @Input() type: string = TYPE_DEF;
  @Input() placeholder: string = "";
  @Input() step?: string;
  @Input() min: number = 0;
  @Input() max?: number;
  @Input() value: string = "";
  @Input() errorText: string = "";
  @Input() isRequired: boolean = true;

  @Output() changeValue = new EventEmitter<string>();

  private subscription!: Subscription;

  inputControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
  ]);
  onChange(_: string) {}
  onTouched(_: any) {}

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.inputControl.valueChanges.subscribe((val) => {
      if (this.onChange) {
        this.onChange(val);
      }
    });
  }

  onDeleteValue() {
    this.writeValue("");
  }

  writeValue(value: string): void {
    this.value = value;
    this.inputControl.setValue(value);
    this.changeValue.emit(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  controlIsValid(): boolean {
    return !this.inputControl.invalid || !this.inputControl.touched;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
