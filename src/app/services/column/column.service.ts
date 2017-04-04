import { Injectable } from '@angular/core';
import { IColumnService } from "app/services/column/icolumnservice";
import { Observable } from "rxjs/Observable";
import { Column } from "app/models/column";

@Injectable()
export class ColumnService implements IColumnService {

    constructor() { }

    create(column: Column): Observable<Column> {
        throw new Error('Method not implemented.');
    }
    getAll(): Observable<Column[]> {
        throw new Error('Method not implemented.');
    }
    get(id: string): Observable<Object> {
        throw new Error('Method not implemented.');
    }
    update(column: Column): Observable<Column> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Observable<Column> {
        throw new Error('Method not implemented.');
    }
}
