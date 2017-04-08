// Angular imports
import { Component, OnInit, Input } from '@angular/core';

// Rxjs imports
import 'rxjs/add/operator/switchMap';

// Custom type imports
import { Todo } from "app/models/todo";
import { Column } from '../../models/column';
import { TodoService } from '../../services/todo/todo.service';
import { ColumnService } from '../../services/column/column.service';

// Component meta data
@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService, ColumnService]
})

// Component
export class TodoComponent implements OnInit {

  // Properties
  @Input() public column: Column;
  private todos: Todo[];
  private newTodo: Todo;
  private selectedTodo: Todo;
  private deletedTodos: Todo[] = [];
  private showCreateForm: boolean;

  // Constructor
  constructor(
    private todoService: TodoService,
    private columnService: ColumnService
  ) { }

  // Initializing
  ngOnInit() {
    this.getTodosByColumnId();
    this.newTodo = new Todo({
      order: 10000,
      columnId: this.column._id
    });
  }

  // Methods
  public setShowCreateForm(value: boolean): void {
    this.showCreateForm = value;
  }

  private selectTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }

  private getColumn(): void {
    this.columnService.get(this.column._id).subscribe(
      x => this.column = x,
      error => error = <any>error
    );
  }

  private getTodosByColumnId(): void {
    this.todoService.getAllByColumnId(this.column._id).subscribe(
      x => this.todos = x,
      error => error = <any>error
    );
  }

  private createTodo(): void {
    this.todoService.create(this.newTodo).subscribe(
      x => {
        this.todos.push(x);
        this.newTodo = new Todo({
          order: 10000,
          columnId: this.column._id
        });
      },
      error => error = <any>error
    );

    this.setShowCreateForm(false);
  }

  private updateTodo(): void {
    this.todoService.update(this.selectedTodo).subscribe(
      x => {
        // Update todo in local collection as well
        Object.assign(
          this.todos.find(x => x._id === this.selectedTodo._id), // Todo to update
          this.selectedTodo // Update values
        );

        // Done to hide update form
        this.selectedTodo = undefined;
      },
      error => error = <any>error
    );
  }

  private deleteTodo(todo: Todo): void {
    // Save Todo-to-delete in array for undo action
    this.deletedTodos.push(todo);

    // delete the Todo.
    this.todoService.delete(todo._id).subscribe(
      x => this.todos = this.todos.filter(x => x._id !== todo._id),
      error => error = <any>error
    );
  }

  private undoDeleteTodo(): void {
    // Get the column to undo.
    this.newTodo = this.deletedTodos[this.deletedTodos.length - 1];

    // Remove it from the undo stack
    this.deletedTodos = this.deletedTodos.filter(x => x._id !== this.newTodo._id)

    // Recreated the deleted Todo in form of a new column.
    this.createTodo();
  }
}
