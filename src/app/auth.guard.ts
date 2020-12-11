import { Injectable } from '@angular/core';
import { CanActivate, Router ,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  UserService } from './shared/user.service'
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private service: UserService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this.service.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this._router.navigate(['/home/login'])
      return false
    }
  }
}
  

