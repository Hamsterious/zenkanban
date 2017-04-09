// 3rd party imports
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// Class
export class DragulaConfig {

    // Constructor
    constructor(
        private dragulaService: DragulaService
    ) {
        this.disableColumnBagDragOnTodoDrag();
    }

    // Option setter methods
    private disableColumnBagDragOnTodoDrag(): void {
        this.dragulaService.setOptions('column-bag', {
            moves: (el, source, handle, sibling) => {
                // el === The column card
                // source === The column bag
                // handle === Clicked dom element starting the drag
                // sibling === The element "below" the one being dragged.

                // Set column-bag moves option to false if the handle contains a todo-card-part class.
                return !handle.classList.contains('todo-card-part');;
            }
        });
    }

    
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
        // E represents the name of the bag (class name), EL represents the actual dom element
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
        console.log("e");
        console.log(e);
        console.log("el");
        console.log(el);
        console.log("container");
        console.log(container);
    }

    private onOut(args) {
        let [e, el, container] = args;
        console.log("e");
        console.log(e);
        console.log("el");
        console.log(el);
        console.log("container");
        console.log(container);
    }
}