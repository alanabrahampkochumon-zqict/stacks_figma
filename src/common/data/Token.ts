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
 * Type guard to check if a string is a member of {@link ExtendedTokenTypes}.
 */
export function isValidExtendedToken(token: string): boolean {
    return (extendedTokens as readonly string[]).includes(token);
}

/**
 * Validates the underlying values of a token against its schema definition.
 *
 * @param {Record<string, any>} tokenValuesByMode Map of mode keys to their respective values.
 * @param {ExtendedTokenTypes} tokenType The schema to validate against (e.g., "color" checks hex strings).
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
 * List of valid levels.
 *
 * @type {readonly [1, 2, 3, 4]}
 */
export const validLevels = [1, 2, 3, 4] as const;

/**
 * Type definition for Level.
 *
 * @export
 * @typedef {Levels}
 */
export type Levels = (typeof validLevels)[number];

/**
 * Validate the token level.
 *
 * @export
 * @param {number} level The level to validate.
 * @returns {boolean} True if the level is within valid range.
 */
export function isValidLevel(level: number): boolean {
    return (validLevels as readonly number[]).includes(level);
}

/**
 * Type encapsulating a Design System Token.
 * <p>Note: It is not recommended to create tokens as standalone objects.
 * Use {@link TokenNode} and {@link createTokenNode}.</p>
 *
 * @export
 * @typedef {Object} Token
 * @property {Record<string, any>} valueByMode - A key value pair of modes and value associated with that mode. Example: {dark: "#111", light: "eee"}
 * @property {ExtendedTokenTypes} type - Type of token. For details, see {@link ExtendedTokenTypes}
 * @property {"token"} entityType - Internal discriminator used to identify this as a token.
 * @readonly
 */
export type Token = {
    valueByMode: Record<string, any>;
    type: ExtendedTokenTypes;
    entityType: "token";
};

/**
 * Creates a {@link Token} with the given parameters.
 *
 * @export
 * @param {Record<string, any>} valueByMode The key-value pair of mode and value, e.g., {default: "#fff", dark: "#222"}.
 * @param {ExtendedTokenTypes} type The type of token. See {@link TokenType} and {@link ExtendedTokenType}.
 * @returns {Token} The created token object.
 */
export function createToken(
    valueByMode: Record<string, any>,
    type: ExtendedTokenTypes,
): Token {
    if (!valueByMode || !Object.values(valueByMode).length)
        throw new Error("Token must have atleast one value");
    if (!isValidExtendedToken(type)) throw new Error("Invalid token");
    return {
        valueByMode,
        type,
        entityType: "token",
    };
}

/**
 * Type for {@link TokenNode} comparator.
 *
 * @export
 * @typedef {TokenComparator}
 */
export type TokenComparator = (a: TokenNode, b: TokenNode) => number;
