// Jquery definition file
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Custom type imports
import { AppComponent } from './components/app/app.component';
import { BoardComponent } from './components/board/board.component';
import { RoutingModule } from "app/routing/routing.module";
import { BoardContentComponent } from './components/board-content/board-content.component';
import { TodoComponent } from './components/todo/todo.component';

// Module meta data
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardContentComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

// Exports
export class AppModule { }