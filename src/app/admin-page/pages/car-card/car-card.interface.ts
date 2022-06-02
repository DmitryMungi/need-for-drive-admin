import { ICategory } from "src/app/shared/shared.interface";

export interface IThumbnail {
  mimetype: string;
  originalname: string;
  path: string | undefined;
  size: number;
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

export class CarModel {
  categoryId: ICategory;
  colors: string[];
  description: string;
  name: string;
  number: string;
  priceMax: number;
  priceMin: number;
  thumbnail: IThumbnail;

  constructor(car: ICar) {
    (this.categoryId = car.categoryId
      ? car.categoryId
      : {
          description: "",
          id: "",
          name: "",
        }),
      (this.colors = car.colors ? car.colors : []),
      (this.description = car.description ? car.description : ""),
      (this.name = car.name ? car.name : ""),
      (this.number = car.number ? car.number : ""),
      (this.priceMax = car.priceMax ? car.priceMax : 0),
      (this.priceMin = car.priceMin ? car.priceMin : 0),
      (this.thumbnail = car.thumbnail ? car.thumbnail : THUMBNAIL_DEF);
  }
}

export interface ICarRes extends ICar {
  id: string;
}

export const THUMBNAIL_DEF: IThumbnail = {
  mimetype: "",
  originalname: "",
  path: "",
  size: 0,
};
