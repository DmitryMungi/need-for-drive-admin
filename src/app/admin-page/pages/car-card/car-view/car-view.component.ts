import { Component, ViewChild, ElementRef } from "@angular/core";
import { CardService } from "../card.service";
import { THUMBNAIL_DEF, IThumbnail } from "../card.service";

@Component({
  selector: "app-car-view",
  templateUrl: "./car-view.component.html",
  styleUrls: ["./car-view.component.less"],
})
export class CarViewComponent {
  @ViewChild("imgModel", { static: false }) imgModel?: ElementRef;
  public pLevel: number = 40;
  public thumbnail: IThumbnail = THUMBNAIL_DEF;
  constructor(private cardService: CardService) {}

  getImage(value: File) {
    const file = new FileReader();
    file.readAsDataURL(value);

    file.onload = () => {
      const base64 = file.result?.toString();
      this.thumbnail.path = base64;
      this.thumbnail.mimetype = value.type;
      this.thumbnail.originalname = value.name;
      this.thumbnail.size = value.size;

      this.cardService.setThumbnail(this.thumbnail);
    };

    if (this.imgModel != undefined)
      this.imgModel.nativeElement.src = URL.createObjectURL(value);
  }

  textareaChange(value: string) {
    this.cardService.setDescription(value);
  }
}
