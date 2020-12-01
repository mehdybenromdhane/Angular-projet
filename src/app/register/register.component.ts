import { tokenName } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user : User;
 
  listUsers:User[];
  constructor(private service :UserService ,private route:Router) { 

    
  }

  ngOnInit(): void {
    this.user=new User();
  }

  save(){

    this.service.registerUser(this.user).subscribe(
      
      res =>{
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res))
        this.route.navigate(['/home'])

      },
    )
  
}
}
