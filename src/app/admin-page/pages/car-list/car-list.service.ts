import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class CarListService {
  public totalCarsFromRes = 0;

  setTotalCars(value: number) {
    this.totalCarsFromRes = value;
  }

  getTotalCars(): number {
    return this.totalCarsFromRes;
  }
}
