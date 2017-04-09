// 3rd party imports
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// Class
export class DragulaConfig {

    // Constructor
    constructor(
        private dragulaService: DragulaService
    ) {
         this.removeOnSpill();
    }

    // Methods
    private removeOnSpill(): void {
        this.dragulaService.setOptions('column-bag', {
            removeOnSpill: true
        });
    }
}