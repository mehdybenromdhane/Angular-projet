import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  post: Post;
  postList: Post[];
  constructor(private service : PostService) { }

  ngOnInit(): void {

    this.post = new Post();
  }



 
  save(){

    this.service.addPost(this.post).subscribe(
      err => console.log(err)
    );
  }
}
