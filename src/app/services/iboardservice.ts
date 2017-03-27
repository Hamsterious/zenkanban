import { Board } from "app/components/board/board";

export interface IBoardService {
    create(board: Board) : void;
    getAll() : Board[];
    get(id: int) : Board;
    update(id: int) : void;
    delete(id: int) : void;
}
