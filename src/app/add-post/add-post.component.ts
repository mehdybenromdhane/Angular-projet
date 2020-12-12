import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../model/post';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  file:File;
  post: Post;
  postList: Post[];

  @ViewChild('fileInput',{static: false}) fileInput: ElementRef;

  constructor(private service : PostService,private route: Router) { }

  ngOnInit(): void {

    this.post = new Post();
  }

  handle(files:FileList){
    this.file=files[0];
  
  }
  

 
  save(){




  const formData = new FormData();



formData.append("file",this.file,this.file.name);
formData.append("title",this.post.title);
formData.append("description",this.post.description);
formData.append("category",this.post.category);
formData.append("price",this.post.price.toString());
 

  console.log(this.file);
    this.service.addPost(formData).subscribe(
      err => console.log(err)
    );
   
    this.route.navigate(['/home'])


  }
}
