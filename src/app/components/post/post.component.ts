import { Component, Input } from '@angular/core';
import { PostData } from '../interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() postData: PostData;

}