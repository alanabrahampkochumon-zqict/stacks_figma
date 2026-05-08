import {v4 as uuidv4, v4} from "uuid";
import {IllegalArgumentError} from "../error/IllegalArgumentError";
import type {Group} from "./Group";
import {ExtendedToken, type ExtendedTokenMap, type Token_depr} from "./Token";
import {JSON_IDENTIFIER_KEY, JSON_IDENTIFIERS} from "@src/common/utils/Constants.ts";

/**
 * The basic token node of the Design System tree.
 */
type BasicNode = {
    name: string;
    uid: string;
};


/**
 * The base class for all design system tokens.
 * @remarks
 * Direct instantiation of TokenNode is prohibited.
 * Use {@link ValueNode}, {@link GroupNode}, or {@link ReferenceNode}
 * to create the design system tokens.
 */
export abstract class TokenNode {
    id: string
    name: string
    abstract __identifier: string // Identifier used by discriminator for serialization/deserialization

    protected constructor(name: string, id: string) {
        this.id = id
        this.name = name
    }
}


/**
 * A token node representing a concrete Token (Token with a value).
 */
export class ValueNode extends TokenNode {
    valueByMode: Record<string, any> // TODO: Update to use a typesafe mapping
    __identifier = JSON_IDENTIFIERS.VALUE_NODE

    constructor(name: string, valueByMode: Record<string, any>, id: string = v4()) {
        super(name, id)
        this.valueByMode = valueByMode
    }
}


/**
 * A token node representing Group/Folder.
 */
export class GroupNode extends TokenNode {
    expanded: boolean
    children: TokenNode[]
    __identifier = JSON_IDENTIFIERS.GROUP_NODE

    constructor(name: string, children: TokenNode[] = [], expanded: boolean = false, id: string = v4()) {
        super(name, id)
        this.expanded = expanded
        this.children = children
    }
}

/**
 * A token node representing a reference/alias token.
 */
// class ReferenceToken<K extends typeof ExtendedToken> extends TokenNode {
//
// }


//////////////////////DEPRECATED////////////////////
/**
 * A token node representing Group/Folder.
 */
// type GroupNode<K extends keyof typeof ExtendedToken> = {
//     entityType: "group";
//     expanded: boolean;
//     children: TokenNode<K>[];
// } & BasicNode;

/**
 * A token node representing a concrete Token (Token with a value).
 */
// type ValueNode<K extends keyof typeof ExtendedToken> = {
//     entityType: "token";
//     type: K;
//     valueByMode: Record<string, any>; // TODO: Add type safety
// } & BasicNode;

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
// export type TokenNode<K extends keyof typeof ExtendedToken> =
//     | GroupNode<K>
//     | ValueNode<K>
//     | ReferenceNode<K>;

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
 * @param expanded The state of the GroupNode, whether it's expanded or not.
 * @param uid      The unique identifier of the node.
 * @param children The child nodes of the current group.
 *
 * @returns A {@link GroupNode} created with the passed-in paramters.
 */
export function createGroupNode<K extends keyof typeof ExtendedToken>(
    name: string,
    expanded: boolean = false,
    children?: TokenNode<K>[],
    uid?: string | undefined
): GroupNode<K> {
    return {
        name,
        expanded,
        uid: uid || v4(),
        entityType: "group",
        children: children || []
    } as GroupNode<K>;
}

// TODO: Update to Class
/**
 * Construct a {@link ReferenceNode}.
 *
 * @param name        The human-readable name of the node.
 * @param referenceId The unique identifier of the {@link ReferenceNode}, {@link ValueNode}, or
 *                    {@link GroupNode} that this node is aliasing.
 * @param uid         The unique identifier of the node.
 *
 * @returns A {@link ReferenceNode} created with the passed-in parameters.
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
    // Only adds the token if it doesn't already exist in the group.
    if (getIndex(group, value) === -1)
        group.children = [...group.children, value]
}


/**
 * Remove a {@link TokenNode} from a group.
 *
 * @param group The group to remove the token from.
 * @param value The token to remove.
 *
 * @returns The removed {@link TokenNode} or null if it does not exist.
 */
export function removeFromGroup<K extends keyof typeof ExtendedToken>(group: GroupNode<K>, value: TokenNode<K>): TokenNode<K> | null {
    // Store the initial size of the group to ensure that the token exists
    const initialSize = group.children.length
    group.children = group.children.filter(node => node != value)

    // If the number of children(length) remains the same then, it means the `value` does not exist
    // and hence we return a null to indicate nothing was removed.
    return group.children.length === initialSize ? null : value
}

/**
 * Return the index of a given {@link TokenNode} in a group.
 *
 * @param group The group to search in.
 * @param value The token to search.
 *
 * @returns The index of the token if it exists, else -1.
 */
export function getIndex<K extends keyof typeof ExtendedToken>(group: GroupNode<K>, value: TokenNode<K>) {
    return group.children.findIndex(node => node == value)
}


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
