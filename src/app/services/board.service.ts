// Angular imports
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

// Rxjs imports
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

// Custom type imports
import { IBoardService } from "app/services/Iboardservice";
import { Board } from "app/components/board/board";

// Service
@Injectable()
export class BoardService implements IBoardService {

    // Properties
    private boardsUrl: string = "http://localhost:3000/boards";

    // Constructor
    constructor(private http: Http) { }

    // Methods
    public create(board: Board): void {
        throw new Error('Method not implemented.');
    }

    public getAll(): Observable<Board[]> {
        return this.http.get(this.boardsUrl).map(response => response.json());
    }

    public get(id: string): Observable<Board> {
        return this.http.get(this.boardsUrl + "/" + id).map(response => response.json());
    }

    public update(id: string): void {
        throw new Error('Method not implemented.');
    }
    
    public delete(id: string): void {
        throw new Error('Method not implemented.');
    }
}