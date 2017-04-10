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
        this.updateTodosOnDrop();
    }

    // Option setter methods
    private disableColumnBagDragOnTodoDrag(): void {
        this.dragulaService.setOptions('column-bag', {
            moves: (el, source, handle, sibling) => {
                // Set column-bag moves option to false if handle contains a todo-card-part class. Prevents column from being dragged when we try to drag a todo.
                return !handle.classList.contains('todo-card-part');
            }
        });
    }

    // Event subscriber methods
    private updateTodosOnDrop(): void {
        this.dragulaService.drop.subscribe((value) => {
            // Put drop values into own variables
            let [draggedElement, targetBag, originalBag, sibling] = value.slice(1);

            // Extract ids
            let todoId = draggedElement.dataset.todoid;
            let columnId = targetBag.dataset.columnid;
            let tempArray: any = Array.from(targetBag.children);
            let siblingIndex = tempArray.indexOf(sibling);

            // We do not want to splice in the dragged element if it is dropped in the bag it was dragged from. Otherwise we end up copying it!
            if (!this.containsObject(draggedElement, tempArray)) {
                // Prevents the order to fuck when items are attached at the end of a new column, and would have been assigned -1.
                if(siblingIndex === -1) siblingIndex = tempArray.length;
                tempArray.splice(siblingIndex, 0, draggedElement);
            }
                

            // Get the todo to update, set is columnId to the new one, and update the db with changes.
            for (let item of tempArray) {
                let todoId = item.dataset.todoid;
                let todoOrder = tempArray.indexOf(item);
                this.todoService.get(todoId).subscribe(
                    x => {
                        x.order = todoOrder;
                        x.columnId = columnId;
                        this.todoService.update(x).subscribe(x => x, error => error = <any>error);
                    },
                    error => error = <any>error
                );
            }
        });
    }

    private containsObject(obj, list): boolean {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
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