import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailsComponent } from './details/details.component';




const ROUTES:Routes = [

  {path: '' , redirectTo: '/home',pathMatch:'full'},
  {path: 'home', component: HomeComponent },

  {path: 'user', component: UserComponent,canActivate: [AuthGuard]},

  {path: 'list', component: PostsListComponent},
  {path: 'add', component: AddPostComponent},

  {path: 'details', component: PostDetailsComponent},
  {path: 'home/post/:id', component: DetailsComponent},


  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path : '**', component:PageNotFoundComponent}
  
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
