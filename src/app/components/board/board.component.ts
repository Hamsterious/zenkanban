import { Component, OnInit } from '@angular/core';
import { BoardService } from "app/services/board.service";
import { Board } from "app/components/board/board";


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService],
})
export class BoardComponent implements OnInit {

  public boards : {};

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boards = this.boardService.getAll();
  }
  
  onSubmit() {  }

}
