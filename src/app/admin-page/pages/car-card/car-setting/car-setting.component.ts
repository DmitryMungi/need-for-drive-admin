import { Component, OnInit } from "@angular/core";
import { IChek } from "src/app/shared/components/checkbox/checkbox.component";
import { CardService, IPrice } from "../card.service";

@Component({
  selector: "app-car-setting",
  templateUrl: "./car-setting.component.html",
  styleUrls: ["./car-setting.component.less"],
})
export class CarSettingComponent implements OnInit {
  constructor(private cardService: CardService) {}

  public price: IPrice = {
    priceMax: 0,
    priceMin: 0,
  };

  public get categotyList() {
    return this.cardService.getCategoryList();
  }

  public colorsList: string[] = [];
  public activeColorList: string[] = [];

  ngOnInit(): void {}

  addColor(value: string) {
    if (value != "" && value != null) {
      this.colorsList.push(value);
    }
  }

  changeModel(value: string) {
    this.cardService.setCarName(value);
  }

  changeType(value: string) {
    this.cardService.setCategoryValue(value);
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
