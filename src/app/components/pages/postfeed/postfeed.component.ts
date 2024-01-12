import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../create-post/create-post.component';
import { NgxCroppedEvent } from 'ngx-photo-editor';

import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from '../../interfaces/post.interface';



@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit{
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  currentImg:File
  constructor(private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getPosts();
  }
  openDialogWithData(imageData: File): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      data: { image: imageData },
    });
  }

  getPosts(){
    this.firestore.getCollection (
      {
        path: ["Posts"],
        where: [
          new OrderBy("timestamp", "desc"),
          new Limit(10)
        ],
        onComplete: (result) => {
          result.docs.forEach(
              doc => {
                let post = <PostData>doc.data();
                this.posts.push(post);
              }
         );
        },
        onFail: err => {

        }
      }
    );
}
  
}
