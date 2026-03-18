import { IllegalArgumentError } from "../error/IllegalArgumentError";
import type { TokenNode } from "./TokenNode";

/**
 * Basic Design System token categories.
 *
 * @category Constants
 */
export const basicTokens = ["number", "string", "boolean", "color"] as const;

/**
 * Primitive token types used for standard values.
 */
export type BasicTokenTypes = (typeof basicTokens)[number];

/**
 * Complete list of supported token categories, including layout and effects.
 *
 * @category Constants
 */
export const extendedTokens = [
    ...basicTokens,
    "typography",
    "sizing",
    "spacing",
    "animation",
    "corner-radius",
    "box-shadow",
    "gradient",
] as const;

/**
 * Union type of all supported token categories.
 * Used for validation and node classification.
 */
export type ExtendedTokenTypes = (typeof extendedTokens)[number];

/**
 * Validator to check if a string is a member of {@link ExtendedTokenTypes}.
 */
export function isValidExtendedToken(token: string): boolean {
    return (extendedTokens as readonly string[]).includes(token);
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
 *
 * @typedef {Levels}
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
 * @typedef {Object} Token
 * @property {Record<string, any>} valueByMode   Map of mode keys to their respective values. Example: {dark: "#111", light: "eee"}
 * @property {ExtendedTokenTypes} type           The type of token. For details, see {@link ExtendedTokenTypes}
 * @property {"token"} entityType                Internal discriminator used to identify this as a token.
 */
export type Token = {
    valueByMode: Record<string, any>;
    type: ExtendedTokenTypes;
    entityType: "token";
};

/**
 * Factory function to initialize a validated {@link Token}.
 *
 * @param {Record<string, any>} valueByMode The key-value pair of mode and value, e.g., {default: "#fff", dark: "#222"}.
 * @param {ExtendedTokenTypes} type         The type of token. See {@link TokenType} and {@link ExtendedTokenType}.
 *
 * @returns {Token} A frozen-ready token object.
 * @throws {IllegalArgumentError} If `valueByMode` is empty or if `type` is not a valid {@link ExtendedTokenTypes}.
 */
export function createToken(
    valueByMode: Record<string, any>,
    type: ExtendedTokenTypes,
): Token {
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
