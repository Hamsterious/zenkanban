export class Board {
    public _id: string;
    public title: string;
    public description: string;
    constructor(values: Object = {}) {Object.assign(this, values);}
}
