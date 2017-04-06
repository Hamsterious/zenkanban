// Angular imports
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

// Rxjs imports
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

// Custom import types
import { Column } from "app/models/column";
import { IColumnService } from "app/services/column/icolumnservice";

// Service
@Injectable()
export class ColumnService implements IColumnService {
    // Properties
    private url: string = "http://localhost:3000/columns";

    // Constructor
    constructor(private http: Http) { }

    // Methods
    create(column: Column): Observable<Column> {
        var data = JSON.stringify(column);
        return this.http.post(this.url, data, this.getHeaderOption()).map(response => response.json());
    }

    getAllByBoardId(boardId: string): Observable<Column[]> {
        return this.http.get(this.url + "/board/" + boardId).map(response => response.json());
    }

    getAll(): Observable<Column[]> {
        return this.http.get(this.url).map(response => response.json());
    }

    get(id: string): Observable<Object> {
        return this.http.get(this.url + "/" + id).map(response => response.json());
    }

    update(column: Column): Observable<Column> {
      var data = JSON.stringify(column);
        return this.http.post(this.url + "/" + column._id, data, this.getHeaderOption()).map(response => response.json());
    }

    delete(id: string): Observable<Column> {
         return this.http.post(this.url + "/delete/" + id, this.getHeaderOption()).map(response => response.json());
    }

    private getHeaderOption(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }
}
