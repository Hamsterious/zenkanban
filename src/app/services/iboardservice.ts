import { Board } from "app/components/board/board";
import { Observable } from "rxjs/Observable";

export interface IBoardService {
    create(board: Board) : void;
    getAll() : Observable<Board[]>;
    get(id: string) : Observable<Board>;
    update(id: string) : void;
    delete(id: string) : void;
}
