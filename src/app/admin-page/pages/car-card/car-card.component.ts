import { Component, OnInit, ViewChild } from "@angular/core";
import { map, tap } from "rxjs";
import { CardApiService, ICategory } from "./car-card.api.service";
import { CardService, ICar, IThumbnail } from "./card.service";
import { UntilDestroy } from "@ngneat/until-destroy";
import { FormGroup } from "@angular/forms";
import { PROCENT, PROCENT_POINT, START_COUNT } from "./car-card.const";
import { CarViewComponent } from "./car-view/car-view.component";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-car-card",
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.less"],
})
export class CarCardComponent implements OnInit {
  @ViewChild("carView") carView!: CarViewComponent;
  public formModel: FormGroup = new FormGroup({});

  constructor(
    private cardApiService: CardApiService,
    private cardService: CardService
  ) {}

  public categoryList: string[] = [];
  public totalProcent: number = START_COUNT;
  public newCar: ICar = this.cardService.getCar();

  ngOnInit(): void {
    this.cardApiService
      .getCategory()
      .pipe(tap((res) => this.createList(res)))
      .subscribe();
  }

  sendNewCar() {
    this.cardApiService
      .setNewCar(this.newCar)
      .pipe(
        map((res) => res.data),
        tap((res) => this.cardService.setNewCarRes(res))
      )
      .subscribe();
  }

  createList(list: ICategory[]) {
    for (let i = 0; i < list.length; i++) {
      this.categoryList?.push(list[i].name);
    }

    this.cardService.setCatugoryList(this.categoryList, list);
  }

  setTotalProcent() {
    const setting = this.formModel.controls["settings"].value;
    const view = this.formModel.controls["view"].value;
    let totalCount = START_COUNT;
    const length = Object.keys(setting).length + Object.keys(view).length;

    for (let key in setting) {
      totalCount = totalCount + this.onInputFieldProcent(setting[key]);
    }

    for (let key in view) {
      totalCount = totalCount + this.onInputFieldProcent(view[key]);
    }

    this.totalProcent = PROCENT - (PROCENT / length) * totalCount;
  }

  onInputFieldProcent(
    key: string | number | null | object | Array<string> | IThumbnail
  ): number {
    let total = START_COUNT;
    if (typeof key === "number" && (key === START_COUNT || isNaN(key))) {
      total = total + PROCENT_POINT;
    }
    if (typeof key === "string" && key.trim() === "") {
      total = total + PROCENT_POINT;
    }
    if (typeof key === "object") {
      if (!Array.isArray(key) && key === null) {
        total = total + PROCENT_POINT;
      }
      if (Array.isArray(key) && key.length === START_COUNT) {
        total = total + PROCENT_POINT;
      }
    }
    return total;
  }

  deleteValues() {
    this.carView.deleteValues();
    this.setTotalProcent();
  }
}
