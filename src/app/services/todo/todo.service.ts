// Angular imports
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

// Rxjs imports
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

// Custom import types
import { Todo } from "app/models/todo";
import { ITodoService } from "app/services/todo/itodoservice";

// Service
@Injectable()
export class TodoService implements ITodoService {
  
    // Properties
    private url: string = "http://localhost:3000/todos";

    // Constructor
    constructor(private http: Http) { }

    // Methods
    create(todo: Todo): Observable<Todo> {
        var data = JSON.stringify(todo);
        return this.http.post(this.url, data, this.getHeaderOption()).map(response => response.json());
    }

    getAllByColumnId(columnId: string): Observable<Todo[]> {
        return this.http.get(this.url + "/column/" + columnId).map(response => response.json());
    }

    getAll(): Observable<Todo[]> {
        return this.http.get(this.url).map(response => response.json());
    }

    get(id: string): Observable<Todo> {
        return this.http.get(this.url + "/" + id).map(response => response.json());
    }

    update(todo: Todo): Observable<Todo> {
      var data = JSON.stringify(todo);
        return this.http.post(this.url + "/" + todo._id, data, this.getHeaderOption()).map(response => response.json());
    }

    delete(id: string): Observable<Todo> {
         return this.http.post(this.url + "/delete/" + id, this.getHeaderOption()).map(response => response.json());
    }

    private getHeaderOption(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }
}