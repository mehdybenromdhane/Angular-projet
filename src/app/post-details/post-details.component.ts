import { HttpClient } from '@angular/common/http';
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



  constructor(private service : PostService ,private http: HttpClient) { }
  title = 'fileUpload';
  images;
  multipleImages = [];




  
  ngOnInit(){

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
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
