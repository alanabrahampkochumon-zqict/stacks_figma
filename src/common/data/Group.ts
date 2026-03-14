export type Group = {
    name: string;
    expanded: boolean;
    entityType: "group";
};

/**
 * Creates a group from the given parameters.
 * @param name of the group
 * @param expanded whether the group is expanded or not
 * @returns a `Group` object.
 */
export function createGroup(name: string, expanded: boolean = false): Group {
    if (!name.length) throw new Error("Name must not be empty");
    return { name, expanded, entityType: "group" };
}
