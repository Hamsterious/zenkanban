// Angular Imports
import { Component, OnInit } from '@angular/core';

// Custom type imports
import { Column } from '../../models/column';

// Component meta data
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

// Component
export class ColumnComponent implements OnInit {

  // Properties
  public column: Column;

  // Constructor
  constructor() { }

  // Initializing
  ngOnInit() {
  }

  // Methods

}
