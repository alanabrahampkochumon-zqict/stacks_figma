import { v4 as uuidv4 } from "uuid";
import { IllegalArgumentError } from "../error/IllegalArgumentError";
import type { Group } from "./Group";
import type { ExtendedTokenMap, Token } from "./Token";

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
/**
 * Base node for defining properties that a Node must have.
 */
type BasicNode = {
    name: string;
    uid: string;
};

/**
 * Node representing Group/Folder.
 */
type GroupNode = {
    entityType: "group";
    expanded: boolean;
} & BasicNode;

/**
 * Node representing a Concrete Token.
 */
type ValueNode<K extends keyof ExtendedTokenMap> = {
    entityType: "token";
    type: K;
    valueByMode: Record<string, ExtendedTokenMap[K]>;
} & BasicNode;

/**
 * Node representing a Reference Token
 */
type ReferenceNode = {
    entityType: "reference";
    referenceId: string;
    value: unknown;
} & BasicNode;

/**
 * Unified TokenNode type.
 */
export type TokenNode<K extends keyof ExtendedTokenMap> =
    | GroupNode
    | ValueNode<K>
    | ReferenceNode;

export type TokenNode_depr<K extends keyof ExtendedTokenMap> = {
    name: string;
    uid: string;
    value?: Group | Token<K> | undefined;
    parentId?: string | undefined;
    reference?: string | undefined;
};

// export function getGroup<K extends keyof ExtendedTokenMap>(
//     value: Group | Token<K>,
// ): Group | undefined {
//     return value.entityType === "group" ? value : undefined;
// }

// export function getToken<K extends keyof ExtendedTokenMap>(
//     value: Group | Token<K>,
// ): Token<K> | undefined {
//     return value.entityType === "token" ? value : undefined;
// }

/**
 * Factory to create and initialize a {@link TokenNode_depr}.
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
export function createTokenNode<K extends keyof ExtendedTokenMap>(
    name: string,
    value: Group | Token<K> | undefined,
    uid: string | undefined = undefined,
    parentId: string | undefined = undefined,
    reference: string | undefined = undefined,
): TokenNode_depr<K> {
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
    } as TokenNode_depr<K>;
}

//TODO: Add tests
export function createValueNode<K extends keyof ExtendedTokenMap>(
    name: string,
    valueByMode: Record<string, ExtendedTokenMap[K]>,
    uid: string | undefined,
): ValueNode<K> {
    return {
        name,
        uid: uid || uuidv4(),
        valueByMode: valueByMode,
    } as ValueNode<K>;
}

export function createGroupNode(
    name: string,
    expanded: boolean = false,
    uid: string | undefined,
): GroupNode {
    return {
        name,
        expanded,
        uid,
    } as GroupNode;
}

export function createReferenceNode(
    name: string,
    referenceId: string,
    uid: string | undefined,
): ReferenceNode {
    return {
        name,
        uid,
        referenceId,
    } as ReferenceNode;
}
