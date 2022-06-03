import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { ICheck } from "src/app/shared/components/checkbox/checkbox.component";
import { DEFAULT_TYPE } from "../car-card.const";
import { PRICE_RANGE_ERROR_TEXT, ERROR } from "src/app/shared/const/const";
import { CardService } from "../card.service";
import { ICarRes, IPrice } from "../car-card.interface";
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
  @Output() setProcent = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() cancelValues = new EventEmitter<void>();
  @Output() deleteNewCar = new EventEmitter<string>();

  constructor(
    private cardService: CardService,
    public formModel: FormGroupDirective,
    private alertService: AlertService
  ) {}

  public carRes: ICarRes = this.cardService.newCarRes;
  public settingForm = new FormGroup({
    model: new FormControl("", [Validators.required, Validators.minLength(3)]),
    type: new FormControl("", [Validators.required, this.typeValidator]),
    number: new FormControl("", Validators.required),
    colors: new FormControl([], [Validators.required, this.colorValidator]),
    priceMin: new FormControl(0, [Validators.required, this.priceValidator]),
    priceMax: new FormControl(0, [Validators.required, this.priceValidator]),
  });
  public isOpen: boolean = false;
  public carIsEmpty: boolean = Object.keys(this.carRes).length != 0;
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

    if (this.carIsEmpty) {
      setTimeout(() => {
        this.settingForm.patchValue({ model: this.carRes.name });
        this.settingForm.patchValue({ type: this.carRes.categoryId.name });
        this.changeType(this.carRes.categoryId.name);
        this.settingForm.patchValue({ number: this.carRes.number });
        this.settingForm.patchValue({ colors: [this.carRes.colors[0]] });
        this.colorsList = this.carRes.colors;
        this.settingForm.patchValue({ priceMin: this.carRes.priceMin });
        this.settingForm.patchValue({ priceMax: this.carRes.priceMax });
      }, 500);
    }
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
    this.setProcent.emit();
  }

  changeType(value: string) {
    if (value != DEFAULT_TYPE) {
      this.cardService.setCategoryValue(value);
    } else {
      this.settingForm.patchValue({ type: "" });
    }
    this.setProcent.emit();
  }

  changeNumber(value: string) {
    this.cardService.setNumber(value);
    this.setProcent.emit();
  }

  changePriceMin(value: string) {
    const price = Number(value);
    if (this.settingForm.controls["priceMin"].valid) {
      this.price.priceMin = price;
      this.setPriceValues();
    }
    this.setProcent.emit();
  }

  changePriceMax(value: string) {
    const price = Number(value);
    if (this.settingForm.controls["priceMax"].valid) {
      this.price.priceMax = price;
      this.setPriceValues();
    }
    this.setProcent.emit();
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

  toggleCheckBox(value: ICheck) {
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
    this.carIsEmpty = true;
    this.onSave.emit();
  }

  controlIsValid(name: string): boolean {
    return (
      this.settingForm.controls[name].valid ||
      this.settingForm.controls[name].untouched
    );
  }

  onDelete() {
    const carId = this.cardService.newCarRes.id;
    this.deleteNewCar.emit(carId);
  }

  onCancel() {
    this.formModel.onReset();
    this.colorsList.length = 0;
    this.cardService.resetNewCar();
    this.cancelValues.emit();
  }
}
