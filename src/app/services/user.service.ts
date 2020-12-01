import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ,private route:Router) { }

 register_url="http://localhost:3000/api/register";
 login_url="http://localhost:3000/api/login";


  registerUser( user: User){

    return this.http.post(this.register_url, user);


  }

 loginUser( user:User){

    return this.http.post(this.login_url, user);

   
  }


  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){

    localStorage.removeItem('token');
    this.route.navigate([ '/login']);
     
  }
}
