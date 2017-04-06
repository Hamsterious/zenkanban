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
  private boardId: string;
  private board: Board;
  public columns: Column[];
  public newColumn: Column;

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService
  ) { }

  // Initializing
  ngOnInit() {
    this.getBoardIdFromRoute();
    this.getBoard();
    this.getColumnsByBoardId();
    this.newColumn = new Column({
      order: 10000,
      boardId: this.boardId
    });
  }

  // Methods
  private getBoardIdFromRoute(): void {
    this.route.params.switchMap((params: Params) => this.boardId = params['id']).subscribe();
  }

  private getBoard(): void {
    this.boardService.get(this.boardId).subscribe(
      x => this.board = x,
      error => error = <any>error
    );
  }

  private getColumnsByBoardId(): void {
    this.columnService.getAllByBoardId(this.boardId).subscribe(
      x => this.columns = x,
      error => error = <any>error
    );
  }

  private createColumn(): void {
    this.columnService.create(this.newColumn).subscribe(
      x => this.columns.push(x),
      error => error = <any>error
    );
  }
}
