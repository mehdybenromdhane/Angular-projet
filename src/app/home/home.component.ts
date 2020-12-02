import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 selectedPost:Post;
  postsList: Post[] ;
  

  constructor(private service:PostService) { }

  ngOnInit(): void {

    this.service.getPosts().subscribe(
      (data: Post[]) => this.postsList = data);
  }


  onSelectPost(post:any){

    this.selectedPost=post;
    console.log(this.selectedPost);
  }

  onUpdatePostEvent(post: any){
    this.service.updatePost(post).subscribe(resUpdatedPost => post = resUpdatedPost);
    this.selectedPost=null;
  }

  onDeleteEvent(post: any){
    let postArray = this.postsList;
  this.service.deletePost(post).subscribe(
    resDeletedPost =>{
      for (let i=0; i<postArray.length;i++ )
      {
        if(postArray[i]._id ===post._id)
        {
          postArray.splice(i,1);
        }
      }
    }
  );
  this.selectedPost=null;

  }
}
