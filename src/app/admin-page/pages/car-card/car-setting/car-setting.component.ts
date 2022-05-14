import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { IChek } from "src/app/shared/components/checkbox/checkbox.component";
import { CardService, IPrice } from "../card.service";

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
  public settingForm = new FormGroup({
    model: new FormControl("", [Validators.required, Validators.minLength(3)]),
    type: new FormControl("", Validators.required),
    number: new FormControl("", Validators.required),
    colors: new FormControl([], Validators.required),
    priceMin: new FormControl(0, Validators.required),
    priceMax: new FormControl(0, Validators.required),
  });
  public isOpen: boolean = false;

  constructor(
    private cardService: CardService,
    private formModel: FormGroupDirective
  ) {}

  public price: IPrice = {
    priceMax: 0,
    priceMin: 0,
  };

  public get categotyList() {
    return this.cardService.getCategoryList();
  }

  public colorsList: string[] = [];
  public activeColorList: string[] = [];

  public controlIsValid(name: string): boolean {
    return (
      this.settingForm.controls[name].valid ||
      this.settingForm.controls[name].untouched
    );
  }

  ngOnInit(): void {
    this.formModel.form.addControl("settings", this.settingForm);
    console.log(this.settingForm.controls["model"]);
  }

  addColor(value: string) {
    if (value != "" && value != null) {
      this.colorsList.push(value);
    }
  }

  changeModel(value: string) {
    this.cardService.setCarName(value);
    this.settingForm.patchValue({ model: value });
  }

  changeType(value: string) {
    this.cardService.setCategoryValue(value);
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
  }

  changePriceMin(value: string) {
    const price = Number(value);
    if (price > 0) {
      this.price.priceMin = price;
      this.setPriceValues();
    }
  }

  changePriceMax(value: string) {
    const price = Number(value);
    if (price > 0 && this.price.priceMin < price) {
      this.price.priceMax = price;
      this.setPriceValues();
    }
  }

  setPriceValues() {
    if (
      this.price.priceMax > this.price.priceMin &&
      this.price.priceMax != 0 &&
      this.price.priceMin != 0
    ) {
      this.cardService.setPrice(this.price);
    }
  }

  toggleCheckBox(value: IChek) {
    !this.activeColorList.includes(value.name)
      ? this.activeColorList.push(value.name)
      : this.removeColor(value.name);
  }

  removeColor(color: string) {
    const index = this.activeColorList.indexOf(color);
    this.activeColorList.splice(index, 1);
  }
}
