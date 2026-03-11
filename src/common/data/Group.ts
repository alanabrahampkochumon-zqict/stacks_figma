export class Group {
    name: string;
    expanded: boolean;

    constructor(name: string, expanded: boolean = false) {
        this.name = name;
        this.expanded = expanded;
    }
}
