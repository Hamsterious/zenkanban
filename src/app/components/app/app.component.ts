// Angular imports
import { Component } from '@angular/core';

// Component meta data
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.components.scss']
})

// Exports
export class AppComponent {
  title = 'Zen Kanban';
  subtitle = 'Slower, but happier';

  constructor(){
  }
}