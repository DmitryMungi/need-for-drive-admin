import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory } from "src/app/shared/shared.interface";
import { CardApiService } from "../car-card/car-card.api.service";
import { ICarRes } from "../car-card/car-card.interface";
import { CarListApiService } from "./car-list.api.service";
import { CarListService } from "./car-list.service";
import { NUM_ZERO, NUM_TEN, NUM_ONE } from "src/app/shared/const/const";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CardService } from "../car-card/card.service";
import { Router } from "@angular/router";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.less"],
})
export class CarListComponent implements OnInit {
  constructor(
    private carListApi: CarListApiService,
    private cardApi: CardApiService,
    private carListService: CarListService,
    private cardService: CardService,
    private router: Router
  ) {}

  public queryParams = {
    page: NUM_ZERO,
    limit: NUM_TEN,
  };

  public cars$: Observable<ICarRes[]> = this.carListApi.getCars(
    this.queryParams
  );
  public category!: ICategory[];
  public get numberOfPages(): number {
    return Math.floor(
      this.carListService.getTotalCars() / this.queryParams.limit
    );
  }

  ngOnInit(): void {
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
    this.queryParams = { page: NUM_ONE, limit: NUM_TEN };
    this.getCars();
  }

  getCars() {
    this.cars$ = this.carListApi.getCars(this.queryParams);
  }

  onClickRow(car: ICarRes) {
    this.router.navigate(["admin/card"]);
    this.cardService.setNewCarRes(car);
  }
}
