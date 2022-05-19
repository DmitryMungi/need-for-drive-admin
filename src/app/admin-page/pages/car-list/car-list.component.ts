import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory } from "src/app/shared/shared.interface";
import { CardApiService } from "../car-card/car-card.api.service";
import { ICarRes } from "../car-card/car-card.interface";
import { CarListApiService } from "./car-list.api.service";
import { CarListService } from "./car-list.service";

// export interface IFilter {
//   name: string;
//   type: string;
// }

export const LIMIT_ROWS = 10;

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.less"],
})
export class CarListComponent implements OnInit {
  constructor(
    private carListApi: CarListApiService,
    private cardApi: CardApiService,
    private carListService: CarListService
  ) {}

  public cars$!: Observable<ICarRes[]>;
  // public get category() {
  //   return this.cardService.getCategoryList();
  // }
  public queryParams = {
    page: 1,
    limit: 10,
  };

  public category!: ICategory[];
  public totalCars = this.carListService.getTotalCars();

  public nameParam: string = "";
  public typeParam = <ICategory>{};

  ngOnInit(): void {
    this.cars$ = this.carListApi.getCars(this.queryParams);
    this.cardApi.getCategory().subscribe((res) => (this.category = res));
  }
  // "62727f439093d20011224842"

  searchChange() {
    // this.queryParams["name"] = value;
    // this.applyParam({page:1})
  }

  selectChange(value: string) {
    // this.typeParam = value;
    const [type] = this.category.filter((x) => x.name === value);
    // this.typeParam = type;

    // this.queryParams["categoryId"] = type.id;
    this.applyParam({ categoryId: type.id });
  }

  applyParam(params: { [key: string]: string }) {
    this.queryParams = {
      ...this.queryParams,
      ...params,
    };
  }

  clearParams() {
    this.queryParams = { page: 1, limit: 10 };
    this.getCars();
  }

  getCars() {
    // this.cars$ = this.carListApi.getCars(this.typeParam.id);
    this.cars$ = this.carListApi.getCars(this.queryParams);
  }
}
