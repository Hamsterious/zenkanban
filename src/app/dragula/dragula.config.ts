// 3rd party imports
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// Custom type imports
import { TodoService } from '../services/todo/todo.service';
import {ColumnService} from '../services/column/column.service';

// Class
export class DragulaConfig {

    // Constructor
    constructor(
        private dragulaService: DragulaService,
        private todoService: TodoService,
        private columnService: ColumnService
    ) {
        this.disableColumnBagDragOnTodoDrag();
        this.updateTodosOnDrop();
        this.updateColumnsOnDrop();
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
            let [bagName, draggedElement, targetBag, originalBag, sibling] = value.slice(0);

            // Update todos if the bag being dropped into is a todo-bag
            if (bagName === "todo-bag") {

                // Create a temporary array from the target bag children
                // This is done so we can count the indexes of the array, and from that create an sort order.
                let tempArray: any = Array.from(targetBag.children);

                // We need the sibling index of the targetBag where the draggedElement was dropped into, so we can splice in the dragged element on its place.
                let siblingIndex = tempArray.indexOf(sibling);

                // We do not want to splice in the dragged element if it is dropped into the same bag it was dragged from. Otherwise we end up copying it!
                var sameBag = this.containsObject(draggedElement, tempArray);
                if (!sameBag) {

                    // Prevents the order to fuck when items are attached at the end of a new column, and would have been assigned -1, since there is no sibling at the end of the column.
                    if (siblingIndex === -1) siblingIndex = tempArray.length;
                    
                    // Splice in the dragged element at its siblings place.
                    tempArray.splice(siblingIndex, 0, draggedElement);

                }

                // Just a var to see how many http requests are made when dragging a todo.
                let numberOfHttpRequests: number = 0;

                // We extract the column id from the targetBag, so that if the todo has changed column, we can persist its new relationship.
                let columnId = targetBag.dataset.columnid;
                
                // Time to update the todos!
                for (let item of tempArray) {

                    // Get the id of the todo we want to work on
                    let todoId = item.dataset.todoid;

                    // Get its order e.g. its index in the temp array
                    let todoOrder = tempArray.indexOf(item);

                    // Get the todo
                    this.todoService.get(todoId).subscribe(
                        x => {

                            // Set its update values
                            x.order = todoOrder;
                            x.columnId = columnId;
                            
                            // Update the todo
                            this.todoService.update(x).subscribe(x => x, error => error = <any>error);
                        },
                        error => error = <any>error
                    );
                    
                    // We made a get and post request, so we add two to the counter.
                    numberOfHttpRequests += 2;
                }

                // Log to see how many http requests it took to update the who shebang.
                console.log(numberOfHttpRequests);
            }
        });
    }

    private updateColumnsOnDrop(): void {
        this.dragulaService.drop.subscribe((value) => {

            // Put drop values into own variables
            let [bagName, draggedElement, targetBag, originalBag, sibling] = value.slice(0);

            // Update columns if the bag being dropped into is a column-bag
            if (bagName === "column-bag") {

                // Create a temporary array from the target bag children
                // This is done so we can count the indexes of the array, and from that create an sort order.
                let tempArray: any = Array.from(draggedElement.parentNode.children);

                // Update the columns
                for (let item of tempArray) {

                    let columnId = item.dataset.columnid;

                    // Get its order e.g. its index in the temp array
                    let columnOrder = tempArray.indexOf(item);

                    // Get the column
                    this.columnService.get(columnId).subscribe(
                        x => {

                            // Set its update values
                            x.order = columnOrder;
                            
                            // Update the column
                            this.columnService.update(x).subscribe(x => x, error => error = <any>error);
                        },
                        error => error = <any>error
                    );
                }
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