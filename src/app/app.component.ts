import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './shared/user.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],

  animations:[
    //fader,
    //slider
   ]
})
export class AppComponent {
  title = 'GamingShop';



    constructor(public service :UserService , private http:HttpClient) {  


}


prepareRoute(outlet:RouterOutlet){

  return outlet && outlet.activatedRoute && outlet.activatedRoute['animation'];
}



}