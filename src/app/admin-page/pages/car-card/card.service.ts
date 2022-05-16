import { Injectable } from "@angular/core";
import {
  ICar,
  ICategory,
  ICarRes,
  IThumbnail,
  THUMBNAIL_DEF,
  IPrice,
} from "./car-card.interface";

@Injectable({ providedIn: "root" })
export class CardService {
  public categoryList: string[] = [];
  public category: ICategory[] = [];

  public newCar: ICar = {
    categoryId: {
      description: "",
      id: "",
      name: "",
    },
    colors: [],
    description: "",
    name: "",
    number: "",
    priceMax: 0,
    priceMin: 0,
    thumbnail: THUMBNAIL_DEF,
  };

  public newCaeRes: ICarRes = <ICarRes>{};

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
    this.newCaeRes = car;
  }

  resetNewCar() {
    this.newCar = {
      categoryId: {
        description: "",
        id: "",
        name: "",
      },
      colors: [],
      description: "",
      name: "",
      number: "",
      priceMax: 0,
      priceMin: 0,
      thumbnail: THUMBNAIL_DEF,
    };
  }
}
