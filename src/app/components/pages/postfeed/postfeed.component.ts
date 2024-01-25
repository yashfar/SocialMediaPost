import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../create-post/create-post.component';
import { NgxCroppedEvent } from 'ngx-photo-editor';

import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from '../../interfaces/post.interface';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Subscription } from 'rxjs';
import { PostServiceService } from 'src/app/services/PostService/post-service.service';



@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit , OnDestroy{
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  subscription: Subscription;
  currentImg:File
  constructor(private dialog: MatDialog , private storageService:StorageService , private postService:PostServiceService) { }

  
  ngOnInit(): void {
    this.storageService.fetchData();
    this.subscription = this.postService.changedPosts.subscribe(
      (posts:PostData[]) => {
        this.posts = posts
      }
    )
  }
  openDialogWithData(imageData: any): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      data: { image: imageData },
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  
  
}
