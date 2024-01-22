import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatDialogRef } from '@angular/material/dialog';

import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements AfterViewInit , OnInit{
  receivedImage: File;
  formatedImage: string;
  // imagePreview: string | ArrayBuffer | null = null;
  
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage()

  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('image', { static: false }) imageElement: ElementRef;

  CreatePostForm:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any ,  
    private ng2ImgMax: Ng2ImgMaxService , 
    private dialog: MatDialogRef<CreatePostComponent>,
    private storageService:StorageService,
    private router:Router,
    ) {
      this.receivedImage = data?.image.imageBase64;
      this.formatedImage = data?.image.imageFile
    }
  ngOnInit(): void {
    this.CreatePostForm = new FormGroup({
      'description':  new FormControl(),
    })
  }

  ngAfterViewInit(): void {}

  onCreatePost(){}

  onPostClick() {
        let comment = this.CreatePostForm.value.description;
        if(comment.length <= 0 ) return;
        if(this.receivedImage) {
          this.uploadImagePost(comment);
        } else {
          this.uploadPost(comment);
        }
    }

    uploadImagePost(comment:string){
      this.storageService.StorageData(comment , this.formatedImage)
      this.dialog.close();
    }

    uploadPost(comment: string){
      this.firestore.create(
        {
          path: ["Posts"],
          data: {
            comment: comment,
            creatorId: this.auth.getAuth().currentUser.uid,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete: (docId) => {
            this.dialog.close();
          }
        }
      );
  }
}
