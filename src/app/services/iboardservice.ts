import { Board } from "app/components/board/board";

export interface IBoardService {
    create(board: Board) : void;
    getAll() : Board[];
    get(id: number) : Board;
    update(id: number) : void;
    delete(id: number) : void;
}
