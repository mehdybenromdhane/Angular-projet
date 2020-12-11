import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from '../model/User';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 
 user : User;
 userForm : FormGroup;
  constructor( private service : UserService , private route: Router ,private notif : ToastrService) { }

  ngOnInit(): void {

    this.user=new User();
       
      this.userForm = new FormGroup({
      email : new FormControl( '',Validators.required && Validators.email),
      password : new FormControl()

});
  }


  

  

  get email(){
    return this.userForm.get('email');
  }
  loginUser(){
 Object.assign(this.user , this.userForm.value);
  this.service.loginUser(this.user).subscribe(

  res => {
    localStorage.setItem('token', JSON.stringify(res))
    this.route.navigate(['/home'])
    this.notif.success('Success','Welcome',{
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing'
    });
  },
    err =>     this.notif.error('Password or email invalide','Failed',{
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing'
    })

    
)

}




}

