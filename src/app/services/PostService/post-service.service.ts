import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PostData } from 'src/app/components/interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  posts: PostData [] = [];
  changedPosts= new Subject<PostData[]>()

  constructor() { }

  setPosts(data:PostData[]){
    this.posts = data;
    // this.posts.sort((a, b) => b.comment.length - a.comment.length)
    this.changedPosts.next(this.posts.slice())
  }
  getposts(){
    return this.posts.slice()
  }

  addNewPost(post:PostData){
    this.posts.unshift(post);
    this.changedPosts.next(this.posts.slice())
  }

}
