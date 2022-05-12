import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputModule } from "../input/input.module";
import { InputSelectComponent } from "./input-select.component";

@NgModule({
  declarations: [InputSelectComponent],
  imports: [InputModule, CommonModule],
  exports: [InputSelectComponent],
})
export class InputSelectModule {}
