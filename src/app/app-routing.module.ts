import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';




const ROUTES:Routes = [


  {path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
  
]
@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
