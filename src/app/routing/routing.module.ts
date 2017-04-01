// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Common type imports
import { BoardComponent } from '../components/board/board.component';

// Route definitions
const routes: Routes = [
  { path: 'update-board/:id',  component: BoardComponent }
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
