import { Component, OnInit, ViewChild } from "@angular/core";
import { map, take, tap } from "rxjs";
import { CardApiService } from "./car-card.api.service";
import { CardService } from "./card.service";
import { ICar } from "./car-card.interface";
import { UntilDestroy } from "@ngneat/until-destroy";
import { FormGroup } from "@angular/forms";
import { PROCENT, PROCENT_POINT, START_COUNT } from "./car-card.const";
import { CarViewComponent } from "./car-view/car-view.component";
import { ICategory } from "src/app/shared/shared.interface";
import { CarSettingComponent } from "./car-setting/car-setting.component";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-car-card",
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.less"],
})
export class CarCardComponent implements OnInit {
  @ViewChild("carView") carView!: CarViewComponent;
  @ViewChild("carSetting") carSetting!: CarSettingComponent;
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
    const newCar = this.cardService.newCar;
    const newCarRes = this.cardService.newCarRes;

    const request =
      Object.keys(newCarRes).length == 0
        ? this.cardApiService.setNewCar(this.newCar)
        : this.cardApiService.changeNewCar(newCarRes.id, newCar);

    request
      .pipe(
        take(1),
        map((res) => res.data),
        tap((res) => this.cardService.setNewCarRes(res))
      )
      .subscribe();
  }

  createList(list: ICategory[]) {
    this.categoryList = this.categoryList.concat(list.map((x) => x.name));
    this.cardService.setCatugoryList(this.categoryList, list);
  }

  setTotalProcent() {
    const setting = this.formModel.controls["settings"].value;
    const view = this.formModel.controls["view"].value;
    let settingCount = START_COUNT;
    let viewCount = START_COUNT;

    const length = Object.keys(setting).length + Object.keys(view).length;

    settingCount = Object.values(setting).reduce(
      (total: number, key: unknown) => {
        return total + this.onInputFieldProcent(key);
      },
      0
    );

    viewCount = Object.values(view).reduce((total: number, key: unknown) => {
      return total + this.onInputFieldProcent(key);
    }, 0);

    const totalCount = settingCount + viewCount;
    this.totalProcent = PROCENT - (PROCENT / length) * totalCount;
  }

  onInputFieldProcent(key: unknown): number {
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

  cancelValues() {
    this.carView.cancelValues();
    this.setTotalProcent();
  }

  deleteNewCar(id: string) {
    this.cardApiService.deleteNewCar(id).subscribe();
    this.cancelValues();
    this.carSetting.onCancel();
  }
}
