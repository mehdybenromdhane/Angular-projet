import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../shared/post.service';

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

  public editCategory: boolean = false;
  public editDescription: boolean = false;
  public editPrice: boolean = false;


  constructor(private service : PostService ,private http: HttpClient) { }
  



  
  ngOnInit(){

  }

  

  
 

  

    
  

  ngOnChanges(){

    this.editTitle=false;
    this.editCategory= false;
    this.editPrice=false;
    this.editDescription=false;
  }

  onTitleClick(){
    this.editTitle = true;
  }
  onCategoryClick(){
    this.editCategory = true;
  }
  onPriceClick(){
    this.editPrice = true;
  }
  onDescClick(){
    this.editDescription = true;
  }
  updatePost(){

this.updatePostEvent.emit(this.post);
  }

  deletePost(){
this.deletePostEvent.emit(this.post)
  }
}
