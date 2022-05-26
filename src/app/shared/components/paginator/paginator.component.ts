import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DEFAULT_PAGE, MIN_PAGE } from "../../const/const";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.less"],
})
export class PaginatorComponent {
  @Input() totalPages: number = DEFAULT_PAGE;
  @Output() changePage = new EventEmitter<number>();

  constructor() {}

  public activePage = DEFAULT_PAGE;
  public maxPage = this.totalPages;
  public minPage = MIN_PAGE;

  public get prevPage(): number {
    return this.activePage == 1 ? 0 : this.activePage - 1;
  }

  public get nextPage(): number {
    return this.activePage == this.totalPages ? 0 : this.activePage + 1;
  }

  onNextStep() {
    if (this.activePage != this.totalPages) {
      this.activePage += 1;
      this.changePage.emit(this.activePage);
    }
  }

  onPrevStep() {
    if (this.activePage != DEFAULT_PAGE) {
      this.activePage -= 1;
      this.changePage.emit(this.activePage);
    }
  }

  onClick(value: number) {
    this.activePage = value;
    this.changePage.emit(value);
  }
}
