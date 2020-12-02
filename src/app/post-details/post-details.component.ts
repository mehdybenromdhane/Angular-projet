import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {


  @Input()
  post:Post;

  @Output() updatePostEvent = new EventEmitter<Post>();
  @Output() deletePostEvent = new EventEmitter<Post>();

 
  public editTitle: boolean = false;
  constructor(private service : PostService) { }

  ngOnInit(): void {
  }


  ngOnChanges(){

    this.editTitle=false;
  }

  onTitleClick(){
    this.editTitle = true;
  }

  updatePost(){

this.updatePostEvent.emit(this.post);
  }

  deletePost(){
this.deletePostEvent.emit(this.post)
  }
}
