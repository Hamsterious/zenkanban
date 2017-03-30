import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { IBoardService } from "app/services/Iboardservice";
import { Board } from "app/components/board/board";

@Injectable()
export class BoardService implements IBoardService {

  private boardsUrl : string = "http://localhost:3000/boards";

  constructor(private http: Http) { }

  public create(board: Board): void {
    throw new Error('Method not implemented.');
  }
f
  public getAll(): Observable<Board[]> {
    return this.http.get(this.boardsUrl).map(response => response.json());
  }
  public get(id: number): Observable<Board> {
    throw new Error('Method not implemented.');
  }
  public update(id: number): void {
    throw new Error('Method not implemented.');
  }
  public delete(id: number): void {
    throw new Error('Method not implemented.');
  }
}