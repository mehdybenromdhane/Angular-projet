import { Component, Input, OnInit, Query } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

 /* selectedPost:Post;
  postsList: Post[] ;*/
  title:any;
  price:any;
postsList: Post[];

p:number = 1;
  constructor(private service:PostService) { }

  ngOnInit(): void {

    this.service.getPosts().subscribe(
      (data: Post[]) => this.postsList = data);
  }


  Search(){
  
    if(this.title == ""){
      this.ngOnInit();
    }else{
      this.postsList=this.postsList.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());      })
    }

    
  }
  
}
