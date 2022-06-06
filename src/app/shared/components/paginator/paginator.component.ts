import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NUM_ONE, NUM_ZERO, NUM_TWO, NUM_THREE } from "../../const/const";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.less"],
})
export class PaginatorComponent {
  @Input() totalPages: number = NUM_ONE;
  @Output() changePage = new EventEmitter<number>();

  constructor() {}

  public numTwo = NUM_TWO;
  public numThree = NUM_THREE;
  public startPage = NUM_ONE;
  public activePage = NUM_ONE;
  public maxPage = this.totalPages;
  public minPage = NUM_ZERO;

  public get prevPage(): number {
    return this.activePage == NUM_ONE ? NUM_ZERO : this.activePage - NUM_ONE;
  }

  public get nextPage(): number {
    return this.activePage == this.totalPages
      ? NUM_ZERO
      : this.activePage + NUM_ONE;
  }

  onNextStep() {
    if (this.activePage != this.totalPages) {
      this.activePage += NUM_ONE;
      this.changePage.emit(this.activePage);
    }
  }

  onPrevStep() {
    if (this.activePage != NUM_ONE) {
      this.activePage -= NUM_ONE;
      this.changePage.emit(this.activePage);
    }
  }

  onClick(value: number) {
    this.activePage = value;
    this.changePage.emit(value);
  }
}
