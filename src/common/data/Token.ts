import typia from "typia";
import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { type ReferenceID } from "./ReferenceID";
import type { TokenNode } from "./TokenNode";
import { TypographyToken } from "./TypographyToken";

/**
 * Basic Design System token categories.
 *
 * @category Constants
 */

// TODO: Add getGroupName
// TODO: Add getTokenValue/getTokenValueByMode helpers

/**
 * Primitive token types used for validationa and node classfication.
 */
export type BasicTokenMap = {
    number: number | ReferenceID;
    string: string | ReferenceID;
    boolean: boolean | ReferenceID;
    color: string | ReferenceID;
};
/**
 * List of basic token types.
 * @category Constants
 */
export const BASIC_TOKENS: (keyof BasicTokenMap)[] = [
    "number",
    "string",
    "boolean",
    "color",
] as const;

/**
 * Union type of all supported token categories and their respective value types.
 * Used for validation and node classification.
 */
export type ExtendedTokenMap = BasicTokenMap & {
    typography: TypographyToken | ReferenceID;
    sizing: number | ReferenceID;
    spacing: number | ReferenceID;
    animation: any | ReferenceID; // TODO: Update to use a specific class
    cornerRadius: number | ReferenceID;
    boxShadow: any | ReferenceID; // TODO: Update to use a specific class
    gradient: any | ReferenceID; // TODO: Update to use a specific class
};

/**
 * Complete list of supported token categories, including effects.
 * @category Constants
 */
export const EXTENDED_TOKENS: (keyof ExtendedTokenMap)[] = [
    ...BASIC_TOKENS,
    "typography",
    "sizing",
    "spacing",
    "animation",
    "cornerRadius",
    "boxShadow",
    "gradient",
] as const;

/**
 * Union type of all supported token categories.
 * Used for validation and node classification.
 */
// export type ExtendedTokenTypes = (typeof extendedTokens)[number];

/**
 * Validator to check if a string is a member of {@link ExtendedTokenTypes}.
 */
// export function isValidExtendedToken(token: string): boolean {
//     return (extendedTokens as readonly string[]).includes(token);
// }
export function isValidExtendedToken(input: string): boolean {
    return typia.createIs<keyof ExtendedTokenMap>()(input);
}

/**
 * Validate the underlying values of a token against its schema definition.
 *
 * @param {Record<string, any>} tokenValuesByMode  Map of mode keys to their respective values.
 * @param {ExtendedTokenTypes} tokenType           The schema to validate against (e.g., "color" checks hex strings).
 *
 * @returns {boolean} `true` if all values satisfy the type requirements.
 */
export function validateToken(
    tokenValuesByMode: Record<string, any>,
    tokenType: ExtendedTokenTypes,
): boolean {
    if (!tokenValuesByMode) return false;
    const tokens = Object.values(tokenValuesByMode);

    switch (tokenType) {
        case "number":
        case "sizing":
        case "spacing":
        case "corner-radius":
            return tokens.every((token) => typeof token === "number");
        case "string":
            return tokens.every((token) => typeof token === "string");
        case "boolean":
            return tokens.every((token) => typeof token === "boolean");
        case "color":
            return tokens.every(
                (token) =>
                    typeof token === "string" &&
                    !!token.match(/^#([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i)
                        ?.length,
            );
        case "typography":
        // TODO: V
        case "gradient":
        // TODO: Implementation
        case "box-shadow":
        // TODO: Implementation
        case "animation":
        // TODO: Implementation
    }
    return false;
}

/**
 * Design System levels
 *
 * @category Constants
 */
export const validLevels = [1, 2, 3, 4] as const;

/**
 * Type definition for Design System level.
 */
export type Levels = (typeof validLevels)[number];

/**
 * Validate the token level.
 *
 * @param {number} level The level to validate.
 * @returns {boolean} True if the level is within valid range.
 */
export function isValidLevel(level: number): boolean {
    return (validLevels as readonly number[]).includes(level);
}

/**
 * Represents a single Design System Token entry.
 * @remarks
 * **Important:** Do not instantiate this object manually.
 * Use the {@link createToken} factory function to ensure schema integrity.
 * @see {@link TokenNode} for the tree-structure representation.
 *
 * @property valueByMode Map of mode keys to their respective values. Example: {dark: "#111", light: "eee"}
 * @property type        The type of token. For details, see {@link ExtendedTokenTypes}
 * @property entityType  Internal discriminator used to identify this as a token.
 */
export type Token<K extends keyof ExtendedTokenMap> = {
    type: K;
    valueByMode: Record<string, ExtendedTokenMap[K]>;
    entityType: "token";
};

/**
 * Initialize a validated {@link Token}.
 *
 * @param valueByMode The key-value pair of mode and value, e.g., {default: "#fff", dark: "#222"}.
 * @param type        The type of token. @see {@link BasicTokenMap} and {@link ExtendedTokenMap}.
 *
 * @returns A frozen-ready token object.
 *
 * @throws {IllegalArgumentError} If `valueByMode` is empty or if `type` is not a valid {@link ExtendedTokenTypes}.
 */
export function createToken<K extends keyof ExtendedTokenMap>(
    type: K,
    valueByMode: Record<string, ExtendedTokenMap[K]>,
): Token<K> {
    if (!valueByMode || !Object.values(valueByMode).length)
        throw new IllegalArgumentError("Token must have atleast one value");
    if (!isValidExtendedToken(type))
        throw new IllegalArgumentError("Invalid token");
    return {
        valueByMode,
        type,
        entityType: "token",
    };
}

/**
 * Comparator definition used by {@link TokenNode}.
 */
export type TokenComparator = (a: TokenNode, b: TokenNode) => number;
