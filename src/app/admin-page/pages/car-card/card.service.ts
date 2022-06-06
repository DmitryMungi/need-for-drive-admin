import { Injectable } from "@angular/core";
import {
  ICar,
  ICarRes,
  IThumbnail,
  IPrice,
  CarModel,
} from "./car-card.interface";
import { ICategory } from "src/app/shared/shared.interface";

@Injectable({ providedIn: "root" })
export class CardService {
  public categoryList: string[] = [];
  public category: ICategory[] = [];
  public newCar = new CarModel(<ICar>{});
  public newCarRes: ICarRes = <ICarRes>{};

  getCar(): ICar {
    return this.newCar;
  }

  getCategoryList(): string[] {
    return this.categoryList;
  }

  setCatugoryList(list: string[], category: ICategory[]) {
    this.categoryList = list;
    this.category = category.slice();
  }

  setThumbnail(value: IThumbnail) {
    this.newCar.thumbnail = value;
  }

  setDescription(value: string) {
    this.newCar.description = value;
  }

  setCarName(value: string) {
    this.newCar.name = value;
  }

  setCategoryValue(value: string) {
    const [active] = this.category.filter((x) => x.name === value);
    this.newCar.categoryId = active;
  }

  setNumber(value: string) {
    this.newCar.number = value;
  }

  setPrice(value: IPrice) {
    this.newCar.priceMax = value.priceMax;
    this.newCar.priceMin = value.priceMin;
  }

  setColors(colors: Array<string>) {
    this.newCar.colors = colors;
  }

  setNewCarRes(car: ICarRes) {
    this.newCarRes = car;
  }

  resetNewCar() {
    this.newCar = new CarModel(<ICar>{});
    this.newCarRes = <ICarRes>{};
  }
}
