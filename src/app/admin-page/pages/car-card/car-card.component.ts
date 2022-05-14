import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { CardApiService, ICategory } from "./car-card.api.service";
import { CardService } from "./card.service";
import { UntilDestroy } from "@ngneat/until-destroy";
import { FormGroup } from "@angular/forms";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-car-card",
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.less"],
})
export class CarCardComponent implements OnInit {
  public formModel: FormGroup = new FormGroup({});

  constructor(
    private cardApiService: CardApiService,
    private cardService: CardService
  ) {}

  public categoryList: string[] = [];

  ngOnInit(): void {
    console.log(this.formModel);
    this.cardApiService
      .getCategory()
      .pipe(tap((res) => this.createList(res)))
      .subscribe();
  }

  createList(list: ICategory[]) {
    for (let i = 0; i < list.length; i++) {
      this.categoryList?.push(list[i].name);
    }

    this.cardService.setCatugoryList(this.categoryList, list);
  }
}
