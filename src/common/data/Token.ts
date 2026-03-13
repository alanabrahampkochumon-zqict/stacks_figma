export const basicTokens = ["number", "string", "boolean", "color"] as const;
export type BasicTokenTypes = (typeof basicTokens)[number];
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
export type ExtendedTokenTypes = (typeof extendedTokens)[number];

export function isValidExtendedToken(token: string): boolean {
    return (extendedTokens as readonly string[]).includes(token);
}

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

export const validLevels = [1, 2, 3, 4] as const;

export type Levels = (typeof validLevels)[number];

export function isValidLevel(level: number): boolean {
    return (validLevels as readonly number[]).includes(level);
}

export type Token = {
    name: string;
    valueByMode: Record<string, any>;
    type: ExtendedTokenTypes;
    entityType: "token";
};

/**
 * Creates a token with the given parameters.
 * @param name Name of the token.
 * @param valueByMode key-value pair of mode and value eg, {default: "#fff", dark: "#222"}.
 * @param type type of token. See `TokenType` and `ExtendedTokenType`.
 * @returns a token object.
 */
export function createToken(
    name: string,
    valueByMode: Record<string, any>,
    type: ExtendedTokenTypes,
): Token {
    if (!name || !name.length) throw new Error("Tokens must have a name");
    if (!valueByMode || !Object.values(valueByMode).length)
        throw new Error("Token must have atleast one value");
    if (!isValidExtendedToken(type)) throw new Error("Invalid token");
    return {
        name,
        valueByMode,
        type,
        entityType: "token",
    };
}

export type TokenComparator = (a: Token, b: Token) => number;
