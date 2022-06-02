import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { CardService } from "../card.service";
import { THUMBNAIL_DEF, IThumbnail } from "../car-card.interface";
import { DEFAULT_CAR_NAME, DEFAULT_TYPE } from "../car-card.const";
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { InputFileComponent } from "src/app/shared/components/input-file/input-file.component";
import { TextareaComponent } from "src/app/shared/components/textarea/textarea.component";

@Component({
  selector: "app-car-view",
  templateUrl: "./car-view.component.html",
  styleUrls: ["./car-view.component.less"],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class CarViewComponent implements OnInit {
  @ViewChild("imgModel", { static: false }) imgModel!: ElementRef;
  @ViewChild("inputFile") inputFile!: InputFileComponent;
  @ViewChild("textarea") textarea!: TextareaComponent;
  @Input() procent: number = 0;
  @Output() setProcent = new EventEmitter<void>();
  public thumbnail: IThumbnail = THUMBNAIL_DEF;

  public viewForm = new FormGroup({
    thumbnail: new FormControl(null, Validators.required),
    description: new FormControl("", Validators.required),
  });

  constructor(
    private cardService: CardService,
    private formModel: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.formModel.form.addControl("view", this.viewForm);
  }

  public get name(): string {
    const name = this.cardService.getCar().name;
    return name === "" ? DEFAULT_CAR_NAME : name;
  }

  public get type(): string {
    const type = this.cardService.getCar().categoryId.name;
    return type != "" ? type : DEFAULT_TYPE;
  }

  getImage(value: File) {
    const file = new FileReader();
    file.readAsDataURL(value);

    file.onload = () => {
      const base64 = file.result?.toString();
      this.thumbnail.path = base64;
      this.thumbnail.mimetype = value.type;
      this.thumbnail.originalname = value.name;
      this.thumbnail.size = value.size;

      this.viewForm.patchValue({ thumbnail: this.thumbnail });
      this.cardService.setThumbnail(this.thumbnail);
      this.setProcent.emit();
    };

    if (Boolean(this.imgModel))
      this.imgModel.nativeElement.src = URL.createObjectURL(value);
  }

  textareaChange(value: string) {
    this.cardService.setDescription(value);
    this.viewForm.patchValue({ description: value });
    this.setProcent.emit();
  }

  cancelValues() {
    if (this.imgModel != undefined) {
      this.imgModel.nativeElement.src = "";
    }

    this.inputFile.onReset();
    this.textarea.deleteValue();
  }
}
