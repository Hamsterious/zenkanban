// Angular Imports
import { Component, OnInit } from '@angular/core';

// Custom type imports
import { BoardService } from "app/services/board/board.service";
import { Board } from "app/components/board/board";

// Component meta data
@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    providers: [BoardService],
})

// Component
export class BoardComponent implements OnInit {

    // Properties
    public boards: Board[];
    public selectedBoard: Board;
    public newBoard: Board;
    public deletedBoards: Board[] =  [];

    // Constructor
    constructor(
        private boardService: BoardService
    ) { }

    // Initializing
    ngOnInit() {
        this.getBoards();
        this.newBoard = new Board();
    }

    // Methods
    private getBoards(): void {
        this.boardService.getAll().subscribe(
            x => this.boards = x,
            error => error = <any>error
        );
    }

    private getBoard(board: Board): void {
        this.boardService.get(board._id).subscribe(
            x => this.selectedBoard = x,
            error => error = <any>error
        );
    }

    private createBoard(): void {
        this.boardService.create(this.newBoard).subscribe(
            x => {
                this.boards.push(x);
                this.newBoard = new Board();
            },
            error => error = <any>error
        );
    }

    private updateBoard(): void {
        this.boardService.update(this.selectedBoard).subscribe(
            x => {
                // Update board in local collection as well
                Object.assign(
                    this.boards.find(x => x._id === this.selectedBoard._id), // Board to update
                    this.selectedBoard // Update values
                );

                // Done to hide update form
                this.selectedBoard = undefined;
            },
            error => error = <any>error
        );
    }

    private deleteBoard(board: Board): void {
        // Save board-to-delete in array for undo action
        this.deletedBoards.push(board);

        // delete the board.
        this.boardService.delete(board._id).subscribe(
            x => this.boards = this.boards.filter(x => x._id !== board._id),
            error => error = <any>error
        );
    }

    private undoDeleteBoard(): void {
        // Get the board to undo.
        this.newBoard = this.deletedBoards[this.deletedBoards.length -1];

        // Remove it from the undo stack
        this.deletedBoards = this.deletedBoards.filter(x => x._id !== this.newBoard._id)
        
        // Recreated the deleted board in form of a new board.
        this.createBoard();
    }
}
