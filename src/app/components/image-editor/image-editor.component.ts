import { Component, EventEmitter, Output } from '@angular/core';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent {
  // @Output() imageUploaded = new EventEmitter<any>();
  @Output() imageUploaded = new EventEmitter<{ imageFile: File, imageBase64: string }>();
  output?: string;
  formatedImage:File;
  constructor(private service: NgxPhotoEditorService) {}

  fileChangeHandler($event: Event) :void{
    this.service.open($event, {
      aspectRatio: 4 / 3,
      autoCropArea: 1
    }).subscribe(data => {
      this.output = data.base64;
      this.formatedImage = data.file;
      let fileReader = new FileReader();
        fileReader.readAsDataURL(this.formatedImage);
        fileReader.addEventListener(
        "loadend",
        ev => {
          let readableString = fileReader.result.toString();
        }
      );
      this.imageUploaded.emit({ imageFile:this.formatedImage, imageBase64:this.output });
    });
  }
}
