import { v4 as uuidv4, v4 } from "uuid";
import { IllegalArgumentError } from "../error/IllegalArgumentError";
import type { Group } from "./Group";
import { ExtendedToken, type ExtendedTokenMap, type Token_depr } from "./Token";

/**
 * The basic token node of the Design System tree.
 */
type BasicNode = {
    name: string;
    uid: string;
};

/**
 * A token node representing Group/Folder.
 */
type GroupNode<K extends keyof typeof ExtendedToken> = {
    entityType: "group";
    expanded: boolean;
    children: (GroupNode<K> | ValueNode<K> | ReferenceNode<K>)[];
} & BasicNode;

/**
 * A token node representing a concrete Token (Token with a value).
 */
type ValueNode<K extends keyof typeof ExtendedToken> = {
    entityType: "token";
    type: K;
    valueByMode: Record<string, any>; // TODO: Add type safety
} & BasicNode;

/**
 * A token node representing a reference/alias.
 * @remarks
 * The token itself holds no value, and acts as a reference to another
 * {@link ValueNode} or {@link ReferenceNode}.
 */
type ReferenceNode<K extends keyof typeof ExtendedToken> = {
    entityType: "reference";
    referenceId: string;
    type: K;
    value: unknown;
} & BasicNode;

/**
 * Unified TokenNode type.
 */
export type TokenNode<K extends keyof typeof ExtendedToken> =
    | GroupNode<K>
    | ValueNode<K>
    | ReferenceNode<K>;

/**
 * Construct a {@link ValueToken}.
 *
 * @param name        The human-readable name of the node.
 * @param valueByMode The key value pair of values that token holds. E.g: {dark: "#ffffff"}
 * @param type        The type of token.
 *                    Although explicit constraints are not applied, using a type (string value)
 *                    other than ones provided in {@link ExtendedTokenMap} is not recommended.
 * @param uid         The unique identifier of the node.
 *
 * @returns A {@link ValueToken} created with the passed-in paramters.
 */
export function createValueNode<K extends keyof typeof ExtendedToken>(
    name: string,
    valueByMode: Record<string, any>,
    type: K,
    uid?: string | undefined,
): ValueNode<K> {
    return {
        name,
        uid: uid || uuidv4(),
        valueByMode: valueByMode,
        entityType: "token",
        type: type,
    } as ValueNode<K>;
}

/**
 * Construct a {@link GroupNode}.
 *
 * @param name     The human-readable name of the node.
 * @param expanded The state of the GroupNode, whether its expanded or not.
 * @param uid      The unique identifier of the node.
 *
 * @returns A {@link GroupNode} created with the passed-in paramters.
 */
export function createGroupNode<K extends keyof typeof ExtendedToken>(
    name: string,
    expanded: boolean = false,
    uid?: string | undefined,
): GroupNode<K> {
    return {
        name,
        expanded,
        uid: uid || v4(),
        entityType: "group",
    } as GroupNode<K>;
}

/**
 * Construct a {@link ReferenceNode}.
 *
 * @param name        The human-readable name of the node.
 * @param referenceId The unique identifier of the {@link ReferenceNode}, {@link ValueNode}, or
 *                    {@link GroupNode} that this node is aliasing.
 * @param uid         The unique identifier of the node.
 *
 * @returns A {@link ReferenceNode} created with the passed-in paramters.
 */
export function createReferenceNode<K extends keyof typeof ExtendedToken>(
    name: string,
    referenceId: string,
    uid?: string | undefined,
): ReferenceNode<K> {
    return {
        name,
        uid: uid || v4(),
        referenceId,
        entityType: "reference",
    } as ReferenceNode<K>;
}

/**
 * Add a {@link TokenNode} to a group.
 *
 * @param group The group to add the token to.
 * @param value The token to add.
 */
export function addToGroup<K extends keyof typeof ExtendedToken>(group: GroupNode<K>, value: TokenNode<K>) {
    group.children = [...group.children, value]
}

//////////////////////DEPRECATED////////////////////
/**
 * @deprecated Remove
 */
export type TokenNode_depr<K extends keyof typeof ExtendedToken> = {
    name: string;
    uid: string;
    value?: Group | Token_depr<K> | undefined;
    parentId?: string | undefined;
    reference?: string | undefined;
};

/**
 * Factory to create and initialize a {@link TokenNode_depr}.
 * @deprecated
 * @remarks
 * **Priority Logic:** If both `value` and `reference` are provided, `reference` takes
 * precedence and the resulting node's `value` will be set to `undefined`.
 *
 * @param name        The semantic identifier for the node.
 * @param value       The {@link Group} or {@link Token_depr} data. Optional if `reference` is provided.
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
    value: Group | Token_depr<K> | undefined,
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
