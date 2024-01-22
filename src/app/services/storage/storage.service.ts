import { Inject, Injectable } from '@angular/core';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Subject } from 'rxjs';
import { PostData } from 'src/app/components/interfaces/post.interface';
import { PostServiceService } from '../PostService/post-service.service';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { CreatePostComponent } from 'src/app/components/create-post/create-post.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  firestore = new FirebaseTSFirestore();
  auth = new FirebaseTSAuth();
  storage = new FirebaseTSStorage()

  post:PostData
  posts: PostData [] = [];

  receivedImage: File;
  formatedImage: string;

  constructor(
    private postService:PostServiceService,
    ) {}
  StorageData(comment, formatedImage){
      let postId = this.firestore.genDocId();
      this.storage.upload({
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data:formatedImage
        },
        onComplete: (downloadUrl) => {
          this.post = {
            comment: comment,
            creatorId: this.auth.getAuth().currentUser.uid,
            imageUrl: downloadUrl,
          }
          this.postService.addNewPost(this.post);
          this.firestore.create(
            {
                path: ["Posts", postId],
                data: {
                  comment: this.post.comment,
                  creatorId:this.post.creatorId,
                  imageUrl: this.post.imageUrl,
                  timestamp: FirebaseTSApp.getFirestoreTimestamp()
                },
                onComplete: (docId) => {
                    this.fetchData()
                }
            }
          );
        }
      });
  }

  fetchData(){
    return this.firestore.getCollection (
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
                this.postService.setPosts(this.posts)
              }
         );

        },
        onFail: err => {
          alert("Error occur in fetchData service")
        }
      }
    );
  }
  
}
