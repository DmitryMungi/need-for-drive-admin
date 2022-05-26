import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory } from "src/app/shared/shared.interface";
import { CardApiService } from "../car-card/car-card.api.service";
import { ICarRes } from "../car-card/car-card.interface";
import { CarListApiService } from "./car-list.api.service";
import { CarListService } from "./car-list.service";
import { MIN_PAGE, LIMIT_ROWS } from "src/app/shared/const/const";

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
  public queryParams = {
    page: MIN_PAGE,
    limit: LIMIT_ROWS,
  };

  public category!: ICategory[];
  public get numberOfPages(): number {
    return Math.floor(
      this.carListService.getTotalCars() / this.queryParams.limit
    );
  }

  ngOnInit(): void {
    this.cars$ = this.carListApi.getCars(this.queryParams);
    this.cardApi.getCategory().subscribe((res) => (this.category = res));
  }

  selectChange(value: string) {
    const [type] = this.category.filter((x) => x.name === value);
    this.applyParam({ categoryId: type.id });
  }

  changePage(value: number) {
    this.queryParams.page = value;
    this.getCars();
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
    this.cars$ = this.carListApi.getCars(this.queryParams);
  }
}
