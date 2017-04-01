// Angular Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

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

    // Constructor
    constructor(
        private boardService: BoardService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    // Initializing
    ngOnInit() {
        this.getBoards();
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
            x => {
                this.selectedBoard = x;
                console.log(this.selectedBoard);
            },
            error => error = <any>error
        );
    }

    private deleteBoard(id: string): void {
        if (!id) { return; }
        this.boardService.delete(id).subscribe(
            x => console.log(x),
            error => error = <any>error
        );
    }

    private goToUpdateBoard(): void {
        this.router.navigate(['/update-board', this.selectedBoard._id]);
    }


}
