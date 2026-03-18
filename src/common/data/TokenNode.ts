import { v4 as uuidv4 } from "uuid";
import { IllegalArgumentError } from "../error/IllegalArgumentError";
import type { Group } from "./Group";
import type { Token } from "./Token";

/**
 * The atomic unit of the Design System tree.
 * Represents either a functional token or a structural group.
 * @remarks
 * A `TokenNode` can exist in two states:
 * 1. **Concrete**: Holds a {@link Group} or {@link Token} in the `value` property.
 * 2. **Alias/Reference**: Points to another node via `reference` (UID), in which case `value` is `undefined`.
 *
 * @property {string} name                      Semantic name of the node (e.g., "spacing.medium").
 * @property {string} uid                       Unique identifier. Recommended to use the auto-generated UUID.
 * @property {?(Group|Token|undefined)} value   The payload of the node.
 *                                              @see {@link Group} | {@link Token}
 * @property {?(string|undefined)} parentId     UID of the containing {@link Group}. `undefined` for root-level nodes.
 * @property {?(string|undefined)} reference    UID of the target node if this node acts as a reference/alias.
 *
 * * @example
 * // A concrete color token
 * const colorNode: TokenNode = {
 *     name: "brand-primary",
 *     uid: "uuid-123",
 *     value: { valueByMode: { light: "#000" }, type: "color", entityType: "token" }
 * };
 *
 * * @example
 * // An alias token referencing the node above
 * const aliasNode: TokenNode = {
 *     name: "button-bg",
 *     uid: "uuid-456",
 *     reference: "uuid-123"
 * };
 */
export type TokenNode = {
    name: string;
    uid: string;
    value?: Group | Token | undefined;
    parentId?: string | undefined;
    reference?: string | undefined;
};

/**
 * Factory to create and initialize a {@link TokenNode}.
 * @remarks
 * **Priority Logic:** If both `value` and `reference` are provided, `reference` takes
 * precedence and the resulting node's `value` will be set to `undefined`.
 *
 * @param name        The semantic identifier for the node.
 * @param value       The {@link Group} or {@link Token} data. Optional if `reference` is provided.
 * @param uid         Manual UID override. If omitted, a v4 UUID is generated.
 * @param parentId    UID of the parent group.
 * @param reference   UID of the target node for aliasing.
 *
 * @returns A structured TokenNode.
 * @throws {@link IllegalArgumentError}
 * Thrown if both `value` and `reference` are undefined, as the node would have no data.
 */
export function createTokenNode(
    name: string,
    value: Group | Token | undefined,
    uid: string | undefined = undefined,
    parentId: string | undefined = undefined,
    reference: string | undefined = undefined,
): TokenNode {
    if (!value && !reference)
        throw new IllegalArgumentError(
            "Both value and reference cannot be undefined.",
        );

    return {
        name: name,
        uid: uid || uuidv4(),
        value: reference ? undefined : value,
        reference: reference,
        parentId: parentId,
    } as TokenNode;
}
