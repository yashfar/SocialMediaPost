import { Component, EventEmitter, Output } from '@angular/core';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent {
  @Output() imageUploaded = new EventEmitter<any>();
  output?: NgxCroppedEvent;

  constructor(private service: NgxPhotoEditorService) {}

  fileChangeHandler($event: Event) :void{
    this.service.open($event, {
      aspectRatio: 4 / 3,
      autoCropArea: 1
    }).subscribe(data => {
      this.output = data;
      this.imageUploaded.emit(this.output?.base64);
    });
  }
}
