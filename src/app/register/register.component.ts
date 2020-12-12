import { tokenName } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/User';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user : User;
 userForm : FormGroup;
  listUsers:User[];
  constructor(private service :UserService ,private route:Router,private notif : ToastrService) { 

    
  }

   ngOnInit(): void {
            this.user=new User();
              
            this.userForm = new FormGroup({
            name : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(25)]),


            username : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
            email : new FormControl( '',[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
            password : new FormControl(),
            tel : new FormControl('',[Validators.required, Validators.pattern('^[0-9]*$') , Validators.minLength(8),Validators.maxLength(8)]),
            role : new FormControl('',Validators.required),

            
          });


                  }


  

  
 
  save(){


    Object.assign(this.user,this.userForm.value);

    this.service.sendEmail("http://localhost:3000/api/sendmail", this.user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          ` ${this.user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      })
    this.service.registerUser(this.user).subscribe(
      
      res =>{
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res))
        this.route.navigate(['/home'])

      },
    )
    this.notif.success('Success','Welcome',{
      timeOut:3000,
      progressBar:true,
      progressAnimation:'increasing'
    });
}
}
