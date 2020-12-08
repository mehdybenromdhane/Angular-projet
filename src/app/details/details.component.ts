import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  id: number ;
  constructor( private service : ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.service.snapshot.params.id;
  }

}
