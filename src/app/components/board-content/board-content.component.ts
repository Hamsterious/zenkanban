import { Component, OnInit } from '@angular/core';
import { BoardService } from "app/services/board/board.service";

// Angular routing
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Location } from '@angular/common';

// Rxjs
import 'rxjs/add/operator/switchMap';

// Custom type imports
import { Board } from "app/components/board/board";

@Component({
  selector: 'board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss'],
  providers: [BoardService]
})
export class BoardContentComponent implements OnInit {

  private board: Board;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBoard();
  }

  private getBoard(): void {
    this.route.params
      .switchMap((params: Params) => this.boardService.get(params['id']))
      .subscribe(
        x => this.board = x,
        error => error = <any>error
      );
  }
}
