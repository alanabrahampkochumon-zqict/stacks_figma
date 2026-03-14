/**
 * Type encapsulating a Group or Folder for structuring tokens.
 * <p>Note: It is not recommended to create groups as standalone objects.
 * Use {@link TokenNode} and {@link createTokenNode}.</p>
 *
 * @export
 * @typedef {Object} Group
 * @property {boolean} expanded - Whether the group is expanded or collapsed.
 * @property {"group"} entityType - Internal discriminator used to identify this as a group.
 * @readonly
 */
export type Group = {
    expanded: boolean;
    entityType: "group";
};

/**
 * Creates a {@link Group} from the passed in parameters.
 *
 * @export
 * @param {boolean} [expanded=false] - Initial expansion state.
 * @returns {Group} A new Group object
 */
export function createGroup(expanded: boolean = false): Group {
    return { expanded, entityType: "group" };
}
