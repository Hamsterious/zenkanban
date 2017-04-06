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
    private columnsUrl: string = "http://localhost:3000/columns";

    // Constructor
    constructor(private http: Http) { }

    // Methods
    create(column: Column): Observable<Column> {
        var data = JSON.stringify(column);
        return this.http.post(this.columnsUrl, data, this.getHeaderOption()).map(response => response.json());
    }

    getAll(): Observable<Column[]> {
        return this.http.get(this.columnsUrl).map(response => response.json());
    }

    get(id: string): Observable<Object> {
        return this.http.get(this.columnsUrl + "/" + id).map(response => response.json());
    }

    update(column: Column): Observable<Column> {
      var data = JSON.stringify(column);
        return this.http.post(this.columnsUrl + "/" + column._id, data, this.getHeaderOption()).map(response => response.json());
    }

    delete(id: string): Observable<Column> {
         return this.http.post(this.columnsUrl + "/delete/" + id, this.getHeaderOption()).map(response => response.json());
    }

    private getHeaderOption(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }
}
