// Angular Imports
import { Component, OnInit } from '@angular/core';

// Custom type imports
import 'rxjs/add/operator/switchMap';

// Custom type imports
import { BoardService } from "app/services/board.service";
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

    private getBoard(id: string): void {
        this.boardService.get(id).subscribe(
            x => this.selectedBoard = x,
            error => error = <any>error
        );
    }

    private createBoard(): void {
        this.boardService.create(this.newBoard).subscribe(
            x => x,
            error => error = <any>error
        );
    }

    private updateBoard(): void {
        this.boardService.update(this.selectedBoard).subscribe(
            x => this.selectedBoard = x,
            error => error = <any>error
        );
    }

    private deleteBoard(id: string): void {
        if (!id) { return; }
        this.boardService.delete(id).subscribe(
            x => x,
            error => error = <any>error
        );
    }
}
