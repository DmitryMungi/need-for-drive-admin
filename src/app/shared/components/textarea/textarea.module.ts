import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TextareaComponent } from "./textarea.component";

@NgModule({
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
  imports: [CommonModule],
})
export class TextAreaModule {}
