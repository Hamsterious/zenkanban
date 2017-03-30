import { Board } from "app/components/board/board";
import { Observable } from "rxjs/Observable";

export interface IBoardService {
    create(board: Board) : void;
    getAll() : Observable<Board[]>;
    get(id: number) : Observable<Board>;
    update(id: number) : void;
    delete(id: number) : void;
}
