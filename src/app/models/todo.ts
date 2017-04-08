export class Todo {
    public _id: string;
    public title: string;
    public details: string;
    public order: number;
    public columnId: string;

    constructor(values: Object = {}) {Object.assign(this, values);}
}
