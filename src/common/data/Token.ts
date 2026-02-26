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
    return false;
}

export type Levels = 1 | 2 | 3 | 4;

export type Token = {
    name: string;
    value: any;
    type: ExtendedTokenTypes;
};

export type TokenComparator = (a: Token, b: Token) => number;
