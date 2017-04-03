import { Component, OnInit } from '@angular/core';
import { BoardService } from "app/services/board/board.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss'],
  providers: [BoardService]
})
export class BoardContentComponent implements OnInit {

  constructor(
      private boardService: BoardService,
      private route: ActivatedRoute,
      private router: Router
    ) { }

  ngOnInit() {
  }

}
