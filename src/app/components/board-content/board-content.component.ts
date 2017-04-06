// Angular Imports
import { Component, OnInit } from '@angular/core';
import { BoardService } from "app/services/board/board.service";

// Angular routing
import { ActivatedRoute, Params } from "@angular/router";

// Rxjs imports
import 'rxjs/add/operator/switchMap';

// Custom type imports
import { Board } from "app/models/board";
import { Column } from '../../models/column';
import { ColumnService } from '../../services/column/column.service';


// Component meta data
@Component({
  selector: 'board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss'],
  providers: [BoardService, ColumnService]
})

// Component
export class BoardContentComponent implements OnInit {

  // Properties
  private board: Board;
  public columns: Column[];

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService
  ) { }

  // Initializing
  ngOnInit() {
    this.getBoard();
    this.getColumnsByBoardId();
  }

  // Methods
  private getBoard(): void {
    this.route.params.switchMap((params: Params) => this.boardService
      .get(params['id']))
      .subscribe(
      x => this.board = x,
      error => error = <any>error
      );
  }

  private getColumnsByBoardId(): void {
    this.route.params.switchMap((params: Params) => this.columnService
      .getAllByBoardId(params['id']))
      .subscribe(
      x => this.columns = x,
      error => error = <any>error
      );
  }
}
