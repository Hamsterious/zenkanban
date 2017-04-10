// 3rd party imports
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// Custom type imports
import { TodoService } from '../services/todo/todo.service';

// Class
export class DragulaConfig {

    // Constructor
    constructor(
        private dragulaService: DragulaService,
        private todoService: TodoService
    ) {
        this.disableColumnBagDragOnTodoDrag();
        this.subscribeToUpdateTodoOnDrop();
    }

    // Option setter methods
    private disableColumnBagDragOnTodoDrag(): void {
        this.dragulaService.setOptions('column-bag', {
            moves: (el, source, handle, sibling) => {
                // Set column-bag moves option to false if the handle contains a todo-card-part class.
                return !handle.classList.contains('todo-card-part');;
            }
        });
    }

    private subscribeToUpdateTodoOnDrop(): void {
        this.dragulaService.drop.subscribe((value) => {
            // Put drop values into own variables
            let [draggedElement, tagertBag] = value.slice(1);

            // Extract ids
            let todoId = draggedElement.dataset.todoid;
            let columnId = tagertBag.dataset.columnid;

            // Get the todo to update, set is columnId to the new one, and update the db with changes.
            this.todoService.get(todoId).subscribe(
                x => {
                    x.columnId = columnId;
                    this.todoService.update(x).subscribe(x => x, error => error = <any>error);
                },
                error => error = <any>error
            );
        });
    }

    ///////////////////////////////////
    /// Below is kept for reference ///
    ///////////////////////////////////

    // Event subscriber methods
    private subscribeToDragEvent(): void {
        this.dragulaService.drag.subscribe((value: any[]) => {
            console.log(`drag: ${value[0]}`);
            this.onDrag(value.slice(1));
        });
    }

    private subscribeToDropEvent(): void {
        this.dragulaService.drop.subscribe((value) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop(value.slice(1));
        });
    }

    private subscribeToOverEvent(): void {
        this.dragulaService.over.subscribe((value) => {
            console.log(`over: ${value[0]}`);
            this.onOver(value.slice(1));
        });
    }

    private subscribeToOutEvent(): void {
        this.dragulaService.out.subscribe((value) => {
            console.log(`out: ${value[0]}`);
            this.onOut(value.slice(1));
        });
    }

    // Activated dom element logger methods.
    private onDrag(args: any[]) {
        let [e, el] = args;
        console.log(e);
        console.log(el);
    }

    private onDrop(args) {
        let [e, el] = args;
        console.log(e);
        console.log(el);
    }

    private onOver(args) {
        let [e, el, container] = args;
        console.log(e);
        console.log(el);
        console.log(container);
    }

    private onOut(args) {
        let [e, el, container] = args;
        console.log(e);
        console.log(el);
        console.log(container);
    }
}