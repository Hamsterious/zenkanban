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
  public selectedColumn: Column;
  public deletedColumns: Column[] = [];

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
   private selectColumn(column: Column): void {
        this.selectedColumn = column;
    }

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
      x => {
        this.columns.push(x);
        this.newColumn = new Column({
          order: 10000,
          boardId: this.boardId
        });
      },
      error => error = <any>error
    );
  }

  private updateColumn(): void {
        this.columnService.update(this.selectedColumn).subscribe(
            x => {
                // Update column in local collection as well
                Object.assign(
                    this.columns.find(x => x._id === this.selectedColumn._id), // Column to update
                    this.selectedColumn // Update values
                );

                // Done to hide update form
                this.selectedColumn = undefined;
            },
            error => error = <any>error
        );
    }

  private deleteColumn(column: Column): void {
    // Save Column-to-delete in array for undo action
    this.deletedColumns.push(column);

    // delete the Column.
    this.columnService.delete(column._id).subscribe(
      x => this.columns = this.columns.filter(x => x._id !== column._id),
      error => error = <any>error
    );
  }

  private undoDeleteColumn(): void {
    // Get the column to undo.
    this.newColumn = this.deletedColumns[this.deletedColumns.length - 1];

    // Remove it from the undo stack
    this.deletedColumns = this.deletedColumns.filter(x => x._id !== this.newColumn._id)

    // Recreated the deleted Column in form of a new column.
    this.createColumn();
  }
}
