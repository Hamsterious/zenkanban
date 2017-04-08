import { Todo } from "app/models/todo";
import { Observable } from "rxjs/Observable";

export interface ITodoService {
    create(todo: Todo): Observable<Todo>;
    getAll(): Observable<Todo[]>;
    getAllByColumnId(columnId: string): Observable<Todo[]>;
    get(id: string): Observable<Todo>;
    update(todo: Todo): Observable<Todo>;
    delete(id: string): Observable<Todo>;
}