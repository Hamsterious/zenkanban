import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  submitted = false;

  constructor() { }

  ngOnInit() {
  }
  
  onSubmit() { this.submitted = true; }

}
