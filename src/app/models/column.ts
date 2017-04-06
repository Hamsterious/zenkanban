export class Column {
    public _id: string;
    public title: string;
    public order: number;
    public boardId: string;
    
    constructor(values: Object = {}) {Object.assign(this, values);}
}