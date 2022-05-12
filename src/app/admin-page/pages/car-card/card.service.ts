import { Injectable } from "@angular/core";

export interface IThumbnail {
  mimetype: string;
  originalname: string;
  path: string | undefined;
  size: number;
}

export interface ICategory {
  description: string;
  id: string;
  name: string;
}

export interface IPrice {
  priceMax: number;
  priceMin: number;
}

export interface ICar {
  categoryId: ICategory;
  colors: string[];
  description: string;
  name: string;
  number: string;
  priceMax: number;
  priceMin: number;
  thumbnail: IThumbnail;
}

export const THUMBNAIL_DEF: IThumbnail = {
  mimetype: "",
  originalname: "",
  path: "",
  size: 0,
};

@Injectable({ providedIn: "root" })
export class CardService {
  public categoryList: string[] = [];
  public category: ICategory[] = [];

  // public thumbnail: IThumbnail = THUMBNAIL_DEF;

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
}
