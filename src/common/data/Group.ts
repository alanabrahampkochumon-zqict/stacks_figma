/**
 * Represents a logical container or folder used to categorize and nest Design Tokens.
 * @remarks
 * Groups do not hold values directly; they provide structure and UI state (expansion)
 * for the token tree. Use this in conjunction with {@link TokenNode} to build
 * hierarchical systems.
 * **Constraint:** To maintain tree integrity, avoid manual instantiation.
 * Use the {@link createGroup} factory or {@link createTokenNode}.
 * @category Structure
 *
 * @property {boolean} expanded     UI state indicating if the group's children are visible in a tree view.
 * @property {"group"} entityType   Internal discriminator used to identify this as a group.
 */
export type Group = {
    expanded: boolean;
    entityType: "group";
};

/**
 * Factory function to initialize a new {@link Group} configuration.
 *
 * @param expanded   Sets the initial visibility state of the group in the UI.
 *
 * @returns A group object with the mandatory `group` discriminator.
 *
 * @example
 * const folder = createGroup(true);
 */
export function createGroup(expanded: boolean = false): Group {
    return { expanded, entityType: "group" };
}
