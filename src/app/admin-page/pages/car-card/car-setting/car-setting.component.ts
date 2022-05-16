import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { IChek } from "src/app/shared/components/checkbox/checkbox.component";
import { DEFAULT_TYPE } from "../car-card.const";
import { PRICE_RANGE_ERROR_TEXT, ERROR } from "src/app/shared/const/const";
import { CardService, IPrice } from "../card.service";
import { AlertService } from "src/app/shared/components/alert/alert.service";

@Component({
  selector: "app-car-setting",
  templateUrl: "./car-setting.component.html",
  styleUrls: ["./car-setting.component.less"],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class CarSettingComponent implements OnInit {
  @ViewChild("inputModel") inputModel!: ElementRef;
  @Output() setProcent = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() deleteValues = new EventEmitter<void>();

  public settingForm = new FormGroup({
    model: new FormControl("", [Validators.required, Validators.minLength(3)]),
    type: new FormControl("", [Validators.required, this.typeValidator]),
    number: new FormControl("", Validators.required),
    colors: new FormControl([], [Validators.required, this.colorValidator]),
    priceMin: new FormControl(0, [Validators.required, this.priceValidator]),
    priceMax: new FormControl(0, [Validators.required, this.priceValidator]),
  });
  public isOpen: boolean = false;

  constructor(
    private cardService: CardService,
    public formModel: FormGroupDirective,
    private alertService: AlertService
  ) {}

  public price: IPrice = {
    priceMax: 0,
    priceMin: 0,
  };

  public get categotyList() {
    return this.cardService.getCategoryList();
  }

  public colorsList: string[] = [];
  public typeDefault: string = DEFAULT_TYPE;

  ngOnInit(): void {
    this.formModel.form.addControl("settings", this.settingForm);
  }

  priceValidator(control: FormControl): { [s: string]: boolean } | null {
    return control.value != 0 ? null : { priceMin: true };
  }

  colorValidator(control: FormControl): { [s: string]: boolean } | null {
    return control.value != [] && control.value != "" ? null : { colors: true };
  }

  typeValidator(control: FormControl): { [s: string]: boolean } | null {
    return control.value === DEFAULT_TYPE ? { type: true } : null;
  }

  addColor(value: string) {
    if (value != "" && value != null) {
      this.colorsList.push(value);
      this.setProcent.emit();
    }
  }

  changeModel(value: string) {
    this.cardService.setCarName(value);
    this.settingForm.patchValue({ model: value });
    this.setProcent.emit();
  }

  changeType(value: string) {
    if (value != DEFAULT_TYPE) {
      this.cardService.setCategoryValue(value);
      this.setProcent.emit();
    }
  }

  typeOnFocus() {
    this.isOpen = true;
  }

  typeBlur() {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }

  changeNumber(value: string) {
    this.cardService.setNumber(value);
    this.settingForm.patchValue({ number: value });
    this.setProcent.emit();
  }

  changePriceMin(value: string) {
    const price = Number(value);
    if (this.settingForm.controls["priceMin"].valid) {
      this.price.priceMin = price;
      this.setPriceValues();
      this.setProcent.emit();
    }
  }

  changePriceMax(value: string) {
    const price = Number(value);
    if (this.settingForm.controls["priceMax"].valid) {
      this.price.priceMax = price;
      this.setPriceValues();
      this.setProcent.emit();
    }
  }

  setPriceValues() {
    if (this.price.priceMin != 0 && this.price.priceMax != 0) {
      if (this.price.priceMax > this.price.priceMin) {
        this.cardService.setPrice(this.price);
      } else {
        this.alertService.showAlert(PRICE_RANGE_ERROR_TEXT, ERROR);
        this.settingForm.controls["priceMin"].patchValue(0);
        this.price.priceMin = 0;
        this.setProcent.emit();
      }
    }
  }

  toggleCheckBox(value: IChek) {
    !this.colorsList.includes(value.name)
      ? this.colorsList.push(value.name)
      : this.removeColor(value.name);
  }

  removeColor(color: string) {
    const index = this.colorsList.indexOf(color);
    this.colorsList.splice(index, 1);
    if (this.colorsList.length === 0) {
      this.settingForm.controls["colors"].patchValue([]);
      this.setProcent.emit();
    }
  }

  saveNewCar() {
    this.cardService.setColors(this.colorsList);
    this.onSave.emit();
  }

  controlIsValid(name: string): boolean {
    return (
      this.settingForm.controls[name].valid ||
      this.settingForm.controls[name].untouched
    );
  }

  onDelete() {
    this.formModel.onReset();
    this.colorsList.length = 0;
    this.cardService.resetNewCar();
    this.deleteValues.emit();
  }
}
