import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from "@angular/core";
import {
  FILE_TYPES,
  TEXT_DEFAULT,
  BYTE,
  KB,
  MB,
  MB_TOTAL,
  KB_TOTAL,
} from "./input-file.const";

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.less"],
})
export class InputFileComponent {
  @ViewChild("inputFile", { static: false }) inputFile!: ElementRef;
  @ViewChild("previev", { static: false }) preview!: ElementRef;
  @Output() getImage = new EventEmitter<File>();
  @Input() accept = [".jpg", ".jpeg", ".png"];

  public prevText: string = TEXT_DEFAULT;

  public get textPreriew(): string {
    return this.prevText;
  }

  constructor() {}

  returnImageValue() {
    const curFiles = this.inputFile.nativeElement.files;

    if (curFiles.length === 0) {
      this.prevText = TEXT_DEFAULT;
    } else {
      for (const file of curFiles) {
        if (this.validFileType(file)) {
          this.prevText = `Имя файла ${
            file.name
          }, размер файла ${this.returnFileSize(file.size)}.`;
          this.getImage.emit(file);
        } else {
          this.prevText = `Фаил ${file.name}: Недопустимый тип файла. Обновите свой выбор.`;
        }
      }
    }
  }

  public validFileType(file: File): boolean {
    return FILE_TYPES.includes(file.type);
  }

  private returnFileSize(number: number): string {
    if (number < KB_TOTAL) {
      return number + BYTE;
    } else if (number > KB_TOTAL && number < 1048576) {
      return (number / KB_TOTAL).toFixed(1) + KB;
    } else if (number > MB_TOTAL) {
      return (number / MB_TOTAL).toFixed(1) + MB;
    }

    return "";
  }

  onReset() {
    this.prevText = TEXT_DEFAULT;
  }
}
