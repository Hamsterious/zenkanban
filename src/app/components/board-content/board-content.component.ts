// Angular imports
import { Component, OnInit } from '@angular/core';

// Angular routing
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// Rxjs imports
import 'rxjs/add/operator/switchMap';

// 3rd party imports
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// Custom type imports
import { Board } from 'app/models/board';
import { Column } from '../../models/column';
import { ColumnService } from '../../services/column/column.service';
import { TodoService } from '../../services/todo/todo.service';
import { BoardService } from 'app/services/board/board.service';
import { DragulaConfig } from '../../dragula/dragula.config';

// Component meta data
@Component({
  selector: 'board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss'],
  providers: [BoardService, ColumnService, TodoService]
})

// Component
export class BoardContentComponent implements OnInit {

  // Properties
  private boardId: string;
  private board: Board;
  private columns: Column[];
  private newColumn: Column;
  private selectedColumn: Column;
  private deletedColumns: Column[] = [];
  private dragulaConfig: DragulaConfig;

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService,
    private todoService: TodoService,
    private location: Location,
    private dragulaService: DragulaService
  ) { }

  // Initializing
  ngOnInit() {
    this.getBoardIdFromRoute();
    this.getBoard();
    this.getColumnsByBoardId();
    this.newColumn = new Column({
      boardId: this.boardId
    });
    this.dragulaConfig = new DragulaConfig(
      this.dragulaService, this.todoService
    );
  }

  // Finilizing
  ngOnDestroy() {
    this.dragulaService.destroy("column-bag");
  }

  // Methods
  private backClicked(): void {
    this.location.back();
  }
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
