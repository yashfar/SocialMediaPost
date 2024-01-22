import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() postData: PostData;
  ngOnInit(): void {
  }

}
