export class Group {
    name: string;
    expanded: boolean;

    constructor(name: string, expanded: boolean = false) {
        if (!name.length) throw new Error("Name must not be empty");
        this.name = name;
        this.expanded = expanded;
    }
}
