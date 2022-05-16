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

export interface ICarRes extends ICar {
  id: string;
}

export const THUMBNAIL_DEF: IThumbnail = {
  mimetype: "",
  originalname: "",
  path: "",
  size: 0,
};
