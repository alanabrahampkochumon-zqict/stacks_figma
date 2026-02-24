export type BasicTokenTypes = "number" | "string" | "boolean" | "color";
export type ExtendedTokenTypes =
    | BasicTokenTypes
    | (
          | "typography"
          | "sizing"
          | "spacing"
          | "animation"
          | "corner-radius"
          | "box-shadow"
          | "gradient"
      );
export function validateToken(
    token: any,
    tokenType: ExtendedTokenTypes,
): boolean {
    switch (tokenType) {
        case "number":
        case "sizing":
        case "spacing":
        case "corner-radius":
            return typeof token === "number";
        case "string":
            return typeof token === "string";
        case "boolean":
            return typeof token === "boolean";
        case "color":
            return (
                typeof token === "string" &&
                !!token.match(/^#([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i)
                    ?.length
            );
        case "gradient":
        // TODO: Implementation
        case "box-shadow":
        // TODO: Implementation
        case "animation":
        // TODO: Implementation
    }
    throw new Error(`${token} is not a valid ${tokenType}.`);
}

export type Levels = 1 | 2 | 3 | 4;

export interface Token {
    name: string;
    value: any;
    type: BasicTokenTypes;
}

export class TokenSet {
    name: string;
    type: ExtendedTokenTypes;
    level: Levels;
    tokens: Token[];

    constructor(
        name: string,
        type: ExtendedTokenTypes = "number",
        level: Levels = 1,
        tokens: Token[] = [],
    ) {
        if (tokens.length && type !== tokens[0].type)
            throw new Error(
                `TokenSet type mismatched. Expected ${type}, where children were passed in as ${tokens[0].type}.`,
            );

        const validationResult = tokens.every(
            (token) =>
                token.type === type && validateToken(token.value, token.type),
        );
        if (!validationResult)
            throw new Error(
                "Invalid token set. Make sure that all the tokens are of the same type and are valid.",
            );
        this.name = name;
        this.type = type;
        this.level = level;
        this.tokens = tokens;
    }
}
