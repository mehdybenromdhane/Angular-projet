import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../model/post';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


   id: any ;

  post:Post;
  constructor( private service : ActivatedRoute , private postService: PostService) { }

  ngOnInit(): void {
    this.id = this.service.snapshot.params.id;


    this.postService.getPostById(this.id).subscribe(
      (data: Post) => this.post = data);  }

 

    
    
  
  
   
  
}
