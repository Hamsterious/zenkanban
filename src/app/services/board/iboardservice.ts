import { Board } from "app/models/board";
import { Observable } from "rxjs/Observable";

export interface IBoardService {
    create(board: Board) : Observable<Board>;
    getAll() : Observable<Board[]>;
    get(id: string) : Observable<Board>;
    update(board: Board) : Observable<Board>;
    delete(id: string) : Observable<Board>;
}
