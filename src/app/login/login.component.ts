import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 
 user : User;
 
  constructor( private service : UserService , private route: Router) { }

  ngOnInit(): void {

    this.user=new User();
  }

  loginUser(){

this.service.loginUser(this.user).subscribe(

  res => {
    localStorage.setItem('token', JSON.stringify(res))
    this.route.navigate(['/home'])
  },
    err => console.log(err)
)

}

}
