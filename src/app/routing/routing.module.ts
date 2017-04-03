// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Common type imports
import { BoardContentComponent } from "app/components/board-content/board-content.component";

// Route definitions
const routes: Routes = [
  { path: 'board-content/:id',  component: BoardContentComponent }
];

// Module meta data
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

// Exports
export class RoutingModule { }
