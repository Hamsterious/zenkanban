// Imports
import { Component, OnInit } from '@angular/core';
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
    public boards : Board[];

    // Constructor
    constructor(
        private boardService: BoardService
    ){}

    // Initializing
    ngOnInit() {
        this.getBoards();
    }

    // Methods
    private getBoards(){
        this.boardService.getAll().subscribe(
            x => this.boards = x,
            error => error = <any>error
        );
    }

    public onSubmit() {}

}
