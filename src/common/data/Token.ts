import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { isReferenceID } from "./ReferenceID";
import type { TokenNode_depr } from "./TokenNode";
import { TypographyToken } from "./TypographyToken";

// TODO: Add getGroupName
// TODO: Add getTokenValue/getTokenValueByMode helpers

/**
 * Basic Design System token categories.
 * @category Constants
 */
export const BasicTokens = {
    number: "number",
    string: "string",
    boolean: "boolean",
    color: "color",
} as const;

/**
 * Complete list of supported Design System token categories, including effects.
 * @category Constants
 */
export const ExtendedTokens = {
    ...BasicTokens,
    typography: "typography",
    sizing: "sizing",
    spacing: "spacing",
    animation: "animation",
    cornerRadius: "cornerRadius",
    boxShadow: "boxShadow",
    gradient: "gradient",
} as const;

/**
 * @deprecated Remove
 * Primitive token types used for validationa and node classfication.
 */
export type BasicTokenMap = {
    number: number;
    string: string;
    boolean: boolean;
    color: string;
};
/**
 * @deprecated Remove
 * Union type of all supported token categories and their respective value types.
 * Used for validation and node classification.
 */
export type ExtendedTokenMap = BasicTokenMap & {
    typography: TypographyToken;
    sizing: number;
    spacing: number;
    cornerRadius: number;
    animation: any; // TODO: Update to use a specific class
    boxShadow: any; // TODO: Update to use a specific class
    gradient: any; // TODO: Update to use a specific class
};

/**
 * Validator to check if a string is a member of {@link ExtendedTokenTypes}.
 */
// export function isValidExtendedToken(token: string): boolean {
//     return (extendedTokens as readonly string[]).includes(token);
// }
export function isValidExtendedToken(input: string): boolean {
    // TODO: Update to use extended token
    // TODO: Add/update test
    return input in ExtendedTokens;
    // return typia.createIs<keyof ExtendedTokenMap>()(input);
}

/**
 * Validate the underlying values of a token against its schema definition.
 *
 * @param tokenValuesByMode Map of mode keys to their respective values.
 * @param tokenType         The schema to validate against (e.g., "color" checks hex strings).
 *
 * @returns True if all values satisfy the type requirements, else False.
 */
export function validateToken(
    tokenValuesByMode: Record<keyof typeof ExtendedTokens, any>,
    tokenType: keyof typeof ExtendedTokens,
): boolean {
    if (!tokenValuesByMode) return false;
    const tokens = Object.values(tokenValuesByMode);
    switch (tokenType) {
        case ExtendedTokens.number:
        case ExtendedTokens.sizing:
        case ExtendedTokens.spacing:
        case ExtendedTokens.cornerRadius:
            return tokens.every(
                (token) => typeof token === "number" || isReferenceID(token),
            );
        case "string":
            return tokens.every(
                (token) => typeof token === "string" || isReferenceID(token),
            );
        case "boolean":
            return tokens.every(
                (token) => typeof token === "boolean" || isReferenceID(token),
            );
        case "color":
            return tokens.every(
                (token) =>
                    (typeof token === "string" &&
                        !!token.match(
                            /^#([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i,
                        )?.length) ||
                    isReferenceID(token),
            );
        case "typography":
            return tokens.every(
                (token) =>
                    (token instanceof TypographyToken &&
                        TypographyToken.validate(token)) ||
                    isReferenceID(token),
            );
        case "gradient":
        // TODO: Implementation
        case "boxShadow":
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
 * @deprecated in favor of {@link ValueNode}, {@link GroupNode}, and {@link ReferenceNode}
 *
 * @remarks
 * **Important:** Do not instantiate this object manually.
 * Use the {@link createToken} factory function to ensure schema integrity.
 * @see {@link TokenNode_depr} for the tree-structure representation.
 *
 * @property valueByMode Map of mode keys to their respective values. Example: {dark: "#111", light: "eee"}
 * @property type        The type of token. For details, see {@link ExtendedTokenTypes}
 * @property entityType  Internal discriminator used to identify this as a token.
 */
export type Token_depr<K extends keyof ExtendedTokenMap> = {
    type: K;
    valueByMode: Record<string, ExtendedTokenMap[K]>;
    entityType: "token";
};

/**
 * Initialize a validated {@link Token_depr}.
 * @deprecated Remove
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
): Token_depr<K> {
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
 * Comparator definition used by {@link TokenNode_depr}.
 */
export type TokenComparator<K extends keyof ExtendedTokenMap> = (
    a: TokenNode_depr<K>,
    b: TokenNode_depr<K>,
) => number;
