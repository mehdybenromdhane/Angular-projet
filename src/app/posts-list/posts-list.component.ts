import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  

})
export class PostsListComponent implements OnInit {



 @Input()
  posts : Post;

  @Output() SelectPost = new EventEmitter<Post>();
 

   

post: Post;
postList: Post[];
  
  constructor() { }

  ngOnInit(): void {

  

  }

  onSelect(ps:Post){
  
    this.SelectPost.emit(ps);
    console.log(ps.title);

  }

  

}

