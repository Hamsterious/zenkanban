import { Column } from "app/models/column";
import { Observable } from "rxjs/Observable";

export interface IColumn {
    create(column: Column) : Observable<Column>;
    getAll() : Observable<Column[]>;
    get(id: string) : Observable<Object>;
    update(column: Column) : Observable<Column>;
    delete(id: string) : Observable<Column>;
}