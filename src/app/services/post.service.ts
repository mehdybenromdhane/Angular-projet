import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Post } from '../model/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {


url="http://localhost:3000/api/post/";
  posts: Post[];
  constructor(private http:HttpClient) { }



  getPosts(){
    return this.http.get<Post[]>('http://localhost:3000/api/posts');
}

addPost( post: Post){

  return this.http.post(this.url, post);
}

updatePost (post : Post): Observable<Post>{

   
  return this.http.put<Post>(this.url+post._id, post);


}

deletePost(post:Post){

  return this.http.delete<Post>(this.url+post._id);


}
}